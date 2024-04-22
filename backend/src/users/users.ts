import { Request, Response, Express } from 'express';
import { userModel } from "./users.dao";
import bcrypt from "bcrypt";

async function getUser(req: Request, res: Response) {
    const params = req.params;
    if (!params['id']) {
        res.status(400).send('Bad Request: id is required');
        return;
    }

    userModel.findById(params['id']).populate('songLikes posts').then((user) => {
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        user.password = "";
        user.firstName = "";
        user.lastName = "";
        res.json(user);
    }, (err) => {
        res.status(500).send();
        console.log(`getUser ${err}`);
    });
    return;
}

async function updateUser(req: Request, res: Response) {
    await userModel.findByIdAndUpdate(req.session.profile, req.body).then((user) => {
        res.json(user);
    })
}

async function getAllUsers(req: Request, res: Response) {
    const requester = await userModel.findById(req.session.profile);
    console.log(requester)
    if (requester?.role !== 'admin') {
        res.status(403).send('Forbidden');
        return;
    }
    userModel.find().then((users) => {
        res.json(users);
    }, (err) => {
        res.status(500).send();
        console.log(`getAllUsers ${err}`);
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
        lastName: body['lastName'],
        role: body['role'] || 'user'
    });

    user.save().then(() => {
        user.password = "";
        res.status(201).json(user);
    }, (err) => {
        res.status(400).send();
        console.log(`createUser ${err}`);
    });
    return;
}

// Delete user
async function deleteUser(req: Request, res: Response) {
    const params = req.params;
    const requester = await userModel.findById(req.session.profile);
    if (requester?.role !== 'admin') {
        res.status(403).send('Forbidden');
        return;
    }
    userModel.findByIdAndDelete(params['id']).then((user) => {
        user ? res.status(204).send() : res.status(404).send('User not found');
    }, (err) => {
        res.status(500).send();
        console.log(`deleteUser ${err}`);
    });
}

export default function registerUserRoutes(app: Express) {
    app.get('/users/:id', getUser);
    app.get('/users', getAllUsers);
    app.post('/users', createUser);
    app.delete('/users/:id', deleteUser);
    app.put('/users', updateUser);
}