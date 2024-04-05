import mongoose, { Schema } from "mongoose";
const postSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
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
        ref: 'Track'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'post' });

export const postModel = mongoose.model("Post", postSchema);