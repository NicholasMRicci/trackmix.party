import mongoose, { Schema } from "mongoose";
export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    songLikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
    }]
}, { collection: 'user' });

export const userModel = mongoose.model("User", userSchema);