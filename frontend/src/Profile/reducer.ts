import { createSlice } from "@reduxjs/toolkit";
import { whoAmI } from "../Client/client";

export type User = {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    songLikes: Array<any>;
    posts: Array<any>;
    role: "admin" | "user";
};

const initialState: { user: User | false } = {
    user: false
};
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
    },
});
export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;