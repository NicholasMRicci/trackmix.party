import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../Profile/reducer";

export interface RootState {
    profileReducer: {
        profile: any;
    };
}
const store = configureStore({
    reducer: {
        // Add the generated reducer here
        profileReducer
    }
});
export default store;