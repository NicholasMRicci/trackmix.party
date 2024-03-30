import mongoose, { Schema } from "mongoose";
const trackSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    file: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'track' });

export const trackModel = mongoose.model("Track", trackSchema);