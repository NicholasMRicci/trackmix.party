import mongoose from "mongoose";
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
    lastName: String
}, { collection: 'user' });

export const userModel = mongoose.model("User", userSchema);