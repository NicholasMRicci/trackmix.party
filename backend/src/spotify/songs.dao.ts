import mongoose, { Schema } from "mongoose";
export const songSchema = new mongoose.Schema({

}, { collection: 'song' });

export const songModel = mongoose.model("Song", songSchema);