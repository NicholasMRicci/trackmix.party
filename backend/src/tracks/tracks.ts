import mongoose from "mongoose";
import mongodb from "mongodb";
import { Request, Response } from "express";

function createTrack(bucket: mongodb.GridFSBucket): (req: Request, res: Response) => void {
    return async (req, res) => {
        const track = req.body;
        if (!track['name']) {
            res.status(400).send('Bad Request: name is required');
            return;
        }
        const uploadStream = bucket.openUploadStream(track['name']);
        uploadStream.write(track['data']);
        uploadStream.end();
        uploadStream.on('finish', () => {
            res.status(201).send();
        });
    }
}

function registerTrackRoutes(app: any) {
    const db = mongoose.connection.db;
    const bucket = new mongodb.GridFSBucket(db);
    app.post('/tracks', createTrack);
}