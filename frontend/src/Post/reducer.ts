import { createSlice } from "@reduxjs/toolkit";
import { User } from "../Profile/reducer";

export interface Post {
    _id: string;
    title: string;
    description: string;
    date: string;
    user: User;
    startingTrack: { file: string, mime_type: string, title: string, description: string };
    inspiredBy: any;
}

const initialState: { posts: Post[] } = {
    posts: [],
};
const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        deletePost(state, action) {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        }
    },
});
export const { setPosts, deletePost } = postSlice.actions;
export default postSlice.reducer;