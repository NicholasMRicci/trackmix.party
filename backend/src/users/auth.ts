import { Request, Response } from 'express';
import { userModel } from "./users.dao";
import bcrypt from "bcrypt";

async function handleLogin(req: Request, res: Response) {
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
        res.status(200).send('Logged in');
        req.session.profile = user;
    } else {
        res.status(401).send('Unauthorized');
        return;
    }

}

function registerAuthRoutes(app: any) {
    app.post('/login', handleLogin);
}

export default registerAuthRoutes;