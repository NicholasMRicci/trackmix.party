import { createSlice } from "@reduxjs/toolkit";

export type User = {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    songLikes: Array<String>;
};

const initialState: { profile: String | false } = {
    profile: false,
};
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
    },
});
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;