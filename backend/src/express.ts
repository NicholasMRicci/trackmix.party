import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import mongoose from "mongoose";
import registerUserRoutes from "./users/users";
import { registerAuthRoutes, requireAuth } from "./users/auth";
import registerTrackRoutes from "./tracks/tracks";
import cors from "cors";
import registerPostRoutes from "./posts/posts";

async function startServer() {
    const app: Express = express();
    const port = process.env.PORT || 3000;

    const cookie_secret = process.env.COOKIE_SECRET;

    if (!cookie_secret) {
        throw new Error('COOKIE_SECRET is not set');
    }

    app.use(session({
        proxy: true,
        secret: process.env.COOKIE_SECRET!,
        cookie: {
            secure: true,
            sameSite: 'strict',
        },
        resave: true,
        saveUninitialized: false
    }));

    app.use(cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    }));


    app.use(express.json())
    app.use(express.urlencoded());
    app.use(requireAuth);
    // app.use('/audio', express.static('/audio'));

    app.disable("x-powered-by");

    await mongoose.connect(process.env.MONGODB_URI!);

    registerUserRoutes(app);
    registerAuthRoutes(app);
    registerTrackRoutes(app);
    registerPostRoutes(app);

    app.listen(port);
}

export default startServer;
