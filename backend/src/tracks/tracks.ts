import { Request, Response, Express, RequestHandler } from "express";
import fs from 'fs';
import busboy from "busboy";
import { trackModel } from "./tracks.dao";

function createTrack(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers });
    var title: string | undefined = undefined;
    var description: string | undefined = undefined;
    var mime_type: string | undefined = undefined;
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
            case 'mime_type':
                mime_type = val;
                break;
            default:
                console.log("Unknown field: " + fieldname)
        }
    });
    bb.on('close', () => {
        if (title === undefined || mime_type === undefined) {
            res.status(400).send("Missing Params");
            fs.unlink("/audio/" + fileID, (err) => {
                console.log(err);
            });
            return;
        }
        const track = new trackModel({
            user_id: req.session.profile,
            title: title,
            description: description,
            file: fileID,
            mime_type: mime_type
        });
        track.save().then(() => {
            res.status(201).send();
        }, (err) => {
            res.status(400).send();
            console.log(`createTrack ${err}`);
            fs.unlink("/audio/" + fileID, (err) => {
                console.log(err);
            });
            return;
        });
    });
    req.pipe(bb);
}

function getMyTracks(req: Request, res: Response) {
    if (req.session.profile === undefined) {
        res.status(400).send();
        return;
    }
    trackModel.find({ user_id: req.session.profile }).then((tracks) => {
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

async function deleteTrack(req: Request, res: Response) {
    if (req.params.id === undefined) {
        res.status(400).send()
    }
    const track = await trackModel.findOne({ _id: req.params.id })
    if (track === undefined || track === null) {
        res.status(404).send();
        return;
    }
    fs.unlink("/audio/" + track.file, (err) => {
        console.log(err);
    });
    await trackModel.deleteOne({ _id: req.params.id })
    res.status(200).send();
    return;
}

export default function registerTrackRoutes(app: Express) {
    app.post('/tracks', createTrack);
    app.get('/tracks', getMyTracks)
    app.get('/tracks/:id', getTrack);
    app.delete('/tracks/:id', deleteTrack);
}