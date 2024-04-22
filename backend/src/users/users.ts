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
    const params = req.params;
    if (req.session.profile !== params.id) {
        res.status(401).send('Unauthorized');
        return;
    }
    if (req.body['password']) {
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(req.body['password'], salt);
        req.body['password'] = hash;
    }
    if (req.body['password'] === "") {
        delete req.body['password'];
    }
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

async function handleLogin(req: Request, res: Response) {
    // Check if already logged in
    if (req.session.profile) {
        req.session.touch();
        res.status(200).send(req.session.profile);
        return;
    }

    const body = req.body;
    if (!body['username'] || !body['password']) {
        res.status(400).send('Bad Request: username and password are required');
        return;
    }
    const user = await userModel.findOne({ username: body['username'] });
    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    const authorized = await bcrypt.compare(body['password'], user.password);
    if (authorized) {
        user.password = "";
        req.session.profile = user._id;
        req.session.save();
        const respUser = await userModel.findById(req.session.profile).populate('songLikes posts');
        res.status(200).json(respUser);
    } else {
        res.status(401).send('Unauthorized');
        return;
    }

}

function handleLogout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Logged out');
        }
    });

}

async function whoAmI(req: Request, res: Response) {
    if (req.session.profile) {
        const user = await userModel.findOne({ _id: req.session.profile }).populate('songLikes posts')
        res.json(user);
    } else {
        res.status(401).send('Unauthorized');
    }
}

export default function registerUserRoutes(app: Express) {
    app.get('/users/:id', getUser);
    app.get('/users', getAllUsers);
    app.post('/users', createUser);
    app.delete('/users/:id', deleteUser);
    app.put('/users/:id', updateUser);

    app.post('/login', handleLogin);
    app.get('/whoami', whoAmI);
    app.post('/logout', handleLogout);
}