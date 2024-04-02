import { postModel } from "./posts.dao";
import { Request, Response, Express } from "express";

function getPosts(req: Request, res: Response) {
    postModel.find({}).then((posts: any) => {
        res.json(posts);
    });
}

function createPost(req: Request, res: Response) {
    const body = req.body;
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

export default function registerPostRoutes(app: Express) {
    app.get("/posts", getPosts);
    app.post("/posts", createPost);
}