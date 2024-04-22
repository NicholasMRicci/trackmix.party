import mongoose, { Schema } from "mongoose";
import { userSchema } from "../users/users.dao";
import { trackSchema } from "../tracks/tracks.dao";
const postSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startingTrack: {
        type: trackSchema,
        required: true
    },
    inspiredBy: {
        type: Schema.Types.ObjectId,
        ref: "Song"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'post' });

export const postModel = mongoose.model("Post", postSchema);