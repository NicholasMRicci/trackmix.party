import mongoose from "mongoose";
import { Request, Response, Express, RequestHandler } from "express";
import fs from 'fs';
import busboy from "busboy";
import { trackModel } from "./tracks.dao";

function createTrack(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers });
    var title: string | undefined = undefined;
    var description: string | undefined = undefined;
    const fileID = crypto.randomUUID();
    bb.on('file', (name, file, info) => {
        const saveTo = "/audio/" + fileID;
        file.pipe(fs.createWriteStream(saveTo));
    });
    bb.on('field', (fieldname, val) => {
        switch (fieldname) {
            case 'title':
                title = val;
                break;
            case 'description':
                description = val;
                break;
            default:
                console.log("Unknown field: " + fieldname)
        }
    });
    bb.on('close', () => {
        if (title === undefined) {
            res.status(400).send("Title is required");
            fs.unlink("/audio/" + fileID, (err) => {
                console.log(err);
            });
            return;
        }
        const track = new trackModel({
            user_id: req.session.profile?._id!,
            title: title,
            description: description,
            file: fileID
        });
        track.save().then(() => {
            res.status(201).send();
        }, (err) => {
            res.status(400).send();
            console.log(`createTrack ${err}`);
        });
    });
    req.pipe(bb);
}

function getMyTracks(req: Request, res: Response) {
    if (req.session.profile?._id === undefined) {
        res.status(400).send();
        return;
    }
    trackModel.find({ user_id: req.session.profile._id }).then((tracks) => {
        res.json(tracks);
    });
}

function getTrack(req: Request, res: Response) {
    if (req.params.id === undefined) {
        res.status(400).send();
        return;
    }
    trackModel.findOne({ _id: req.params.id }).then((track) => {
        if (track === null) {
            res.status(404).send();
        } else {
            res.json(track);
        }
    });
}

export default function registerTrackRoutes(app: Express) {
    app.post('/tracks', createTrack);
    app.get('/tracks', getMyTracks)
    app.get('/tracks/:id', getTrack);
}