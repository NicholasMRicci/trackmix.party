import express, { Express, } from "express";
import session from "express-session";
import mongoose from "mongoose";
import registerUserRoutes from "./users/users";
import registerAuthRoutes from "./users/auth";
import cors from "cors";

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
            secure: true
        },
        resave: true
    }));

    app.use(cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    }));

    app.use(express.json())

    app.disable("x-powered-by");

    await mongoose.connect(process.env.MONGODB_URI!);

    registerUserRoutes(app);
    registerAuthRoutes(app);

    app.listen(port);
}

export default startServer;
