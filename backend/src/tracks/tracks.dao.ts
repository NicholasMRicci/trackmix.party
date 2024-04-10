import mongoose, { Schema } from "mongoose";
export const trackSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    mime_type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'track' });

export const trackModel = mongoose.model("Track", trackSchema);