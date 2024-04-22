import { postModel } from "./posts.dao";
import { Request, Response, Express } from "express";
import { userModel } from "../users/users.dao";

function getPosts(req: Request, res: Response) {
    postModel.find({}).populate("startingTrack user").then((posts: any) => {
        res.json(posts);
    });
}

function getPost(req: Request, res: Response) {
    postModel.findById(req.params.id).populate("startingTrack user").then((post: any) => {
        if (post === null) {
            res.sendStatus(404);
        } else {
            res.json(post);
        }
    });
}

async function createPost(req: Request, res: Response) {
    const body = req.body;
    const user_id = req.session.profile;
    body.user = user_id;
    if (body.inspiredBy === "") {
        delete body.inspiredBy;
    }
    if (!body.startingTrack || !body.description || !body.title) {
        res.status(400).send("Missing Required fields");
        return;
    }
    postModel.create(body).then(async (post: any) => {
        await userModel.updateOne({ _id: user_id }, { $push: { posts: post._id } }).exec();
        res.json(post);
    }).catch(
        (err) => {
            console.log(err);
            let resp = "";
            for (let specificError in err.errors) {
                resp += err.errors[specificError].message + "\n";
            }
            res.status(400).send(resp);
        }
    );
}

async function deletePost(req: Request, res: Response) {
    const user = await userModel.findById(req.session.profile);
    postModel.findById(req.params.id).
        then((post: any) => {
            if (post === null) {
                res.sendStatus(404);
            } else if (post.user._id.toString() !== req.session.profile && user?.role !== "admin") {
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
    app.get("/posts/:id", getPost);
}