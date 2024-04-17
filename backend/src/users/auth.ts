import { Request, Response, Express, NextFunction } from 'express';
import { userModel } from "./users.dao";
import bcrypt from "bcrypt";

const exceptions = [
    { path: '/login', method: 'POST', exact: true },
    { path: '/users', method: 'POST', exact: true },
    { path: '/posts', method: 'GET', exact: false },
    { path: '/search', method: 'GET', exact: false }
];

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
        res.status(200).send(req.session.profile);
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
        const user = await userModel.findOne({ _id: req.session.profile }).populate('songLikes')
        res.json(user);
    } else {
        res.status(401).send('Unauthorized');
    }
}

export function registerAuthRoutes(app: Express) {
    app.post('/login', handleLogin);
    app.get('/whoami', whoAmI);
    app.post('/logout', handleLogout);
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.profile) {
        next();
    } else {
        for (const route of exceptions) {
            if ((!route.exact && req.path.startsWith(route.path) || req.path === route.path)
                && req.method === route.method) {
                next();
                return;
            }
        }
        res.status(401).send('Not logged in');
    }
}