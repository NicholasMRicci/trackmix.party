import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../Profile/reducer";
import postReducer from "../Post/reducer";

export interface RootState {
    profileReducer: {
        profile: any;
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