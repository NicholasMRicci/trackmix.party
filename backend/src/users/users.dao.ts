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
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { collection: 'user' });

export const userModel = mongoose.model("User", userSchema);