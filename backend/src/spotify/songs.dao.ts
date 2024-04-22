import mongoose, { Schema } from "mongoose";
export const songSchema = new mongoose.Schema({
    spotifyData: {},
    spotifyId: {
        type: String,
        unique: true
    },
    likes: [{
        ref: 'User',
        type: Schema.Types.ObjectId,
        default: []
    }]
}, { collection: 'song' });

export const songModel = mongoose.model("Song", songSchema);