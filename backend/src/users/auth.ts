import { Request, Response, Express, NextFunction } from 'express';
import { userModel } from "./users.dao";
import bcrypt from "bcrypt";

const exceptions = [
    { path: '/login', method: 'POST', exact: true },
    { path: '/users', method: 'POST', exact: true }
];

async function handleLogin(req: Request, res: Response) {
    // Check if already logged in
    if (req.session.profile) {
        req.session.touch();
        res.status(200).send('Already logged in');
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
        req.session.profile = user;
        req.session.save();
        res.status(200).send('Logged in');
    } else {
        res.status(401).send('Unauthorized');
        return;
    }

}

function whoAmI(req: Request, res: Response) {
    if (req.session.profile) {
        res.json(req.session.profile);
    } else {
        res.status(401).send('Unauthorized');
    }
}

export function registerAuthRoutes(app: Express) {
    app.post('/login', handleLogin);
    app.get('/whoami', whoAmI);
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