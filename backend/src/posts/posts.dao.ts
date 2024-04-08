import mongoose, { Schema } from "mongoose";
import { userSchema } from "../users/users.dao";
const postSchema = new mongoose.Schema({
    user: {
        type: userSchema,
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
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'post' });

export const postModel = mongoose.model("Post", postSchema);