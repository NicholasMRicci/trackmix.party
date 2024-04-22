import { configureStore } from "@reduxjs/toolkit";
import profileReducer, { User } from "../Profile/reducer";
import postReducer from "../Post/reducer";

export interface RootState {
    profileReducer: {
        user: User;
    };
    postReducer: {
        posts: any[];
    };
}
const store = configureStore({
    reducer: {
        // Add the generated reducer here
        profileReducer,
        postReducer,
    }
});
export default store;