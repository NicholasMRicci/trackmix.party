import { Document, Schema } from "mongoose";
import { postModel } from "./posts.dao";
import { Request, Response, Express } from "express";

function getPosts(req: Request, res: Response) {
    postModel.find({}).then((posts: any) => {
        res.json(posts);
    });
}

function createPost(req: Request, res: Response) {
    const body = req.body;
    body.user_id = req.session.profile!._id;
    postModel.create(body).then((post: any) => {
        res.json(post);
    }).catch(
        (err) => {
            let resp = "";
            for (let specificError in err.errors) {
                resp += err.errors[specificError].message + "\n";
            }
            res.status(400).send(resp);
        }
    );
}

function deletePost(req: Request, res: Response) {
    postModel.findById(req.params.id).
        then((post: any) => {
            if (post === null) {
                res.sendStatus(404);
            } else if (post.user_id.toString() !== req.session.profile!._id) {
                console.log(post);
                console.log(req.session.profile)
                res.sendStatus(403);
            } else {
                postModel.deleteOne({ _id: req.params.id }).then(() => {
                    res.sendStatus(200);
                });
            }
        })
}

export default function registerPostRoutes(app: Express) {
    app.get("/posts", getPosts);
    app.post("/posts", createPost);
    app.delete("/posts/:id", deletePost);
}