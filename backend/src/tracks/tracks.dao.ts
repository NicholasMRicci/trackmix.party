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
        required: true
    },
    file: {
        type: Schema.Types.ObjectId,
        ref: 'GFS'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'post' });

export const userModel = mongoose.model("Track", trackSchema);