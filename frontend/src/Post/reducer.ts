import { createSlice } from "@reduxjs/toolkit";
import { Post } from "./list";
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