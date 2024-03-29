import { Document } from "mongoose";
import startServer from "./src/express";

declare module "express-session" {
    interface SessionData {
        profile: Document;
    }
}

startServer();