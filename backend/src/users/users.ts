import { Request, Response, Express } from 'express';
import { userModel } from "./users.dao";
import bcrypt from "bcrypt";

async function getUser(req: Request, res: Response) {
    const params = req.params;
    if (!params['username']) {
        res.status(400).send('Bad Request: username is required');
        return;
    }

    userModel.findOne({ username: params['username'] }).then((user) => {
        user ? res.json(user) : res.status(404).send('User not found');
    }, (err) => {
        res.status(500).send();
        console.log(`getUser ${err}`);
    });
    return;
}

async function createUser(req: Request, res: Response) {
    const body = req.body;
    if (body.signupKey !== process.env.SIGNUP_KEY) {
        res.status(401).send('Signup key is invalid');
        return;
    }
    if (!body['username'] || !body['password']) {
        res.status(400).send('Bad Request: username and password are required');
        return;
    }
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(body['password'], salt);
    const user = new userModel({
        username: body['username'],
        password: hash,
        firstName: body['firstName'],
        lastName: body['lastName']
    });

    user.save().then(() => {
        res.status(201).send();
    }, (err) => {
        res.status(400).send();
        console.log(`createUser ${err}`);
    });
    return;
}

export default function registerUserRoutes(app: Express) {
    app.get('/users/:username', getUser);
    app.post('/users', createUser);
}