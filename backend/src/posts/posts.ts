import { postModel } from "./posts.dao";
import { Request, Response, Express } from "express";
import { userModel } from "../users/users.dao";
import { trackModel } from "../tracks/tracks.dao";

function getPosts(req: Request, res: Response) {
    postModel.find({}).then((posts: any) => {
        res.json(posts);
    });
}

function getPost(req: Request, res: Response) {
    postModel.findById(req.params.id).populate("startingTrack").then((post: any) => {
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
    try {
        body.user = await userModel.findOne({ _id: user_id });
        body.startingTrack = await trackModel.findOne({ _id: body.startingTrack });
    } catch (err) {
        console.log(err);
        res.json(err);
        return;
    }
    postModel.create(body).then((post: any) => {
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

function deletePost(req: Request, res: Response) {
    postModel.findById(req.params.id).
        then((post: any) => {
            if (post === null) {
                res.sendStatus(404);
            } else if (post.user._id.toString() !== req.session.profile) {
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