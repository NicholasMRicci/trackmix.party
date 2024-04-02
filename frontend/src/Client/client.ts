import axios from "axios";
import { useState } from "react";
import store from "../store";
import { setProfile } from "../Profile/reducer";

const client = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export async function getPosts() {
    const response = await client.get("/posts");
    return response.data;
}

export async function createPost(data: { title: string, description: string }) {
    return (await client.post("/posts", data)).data;
}

export async function whoAmI() {
    let user = null;
    try {
        const response = await client.get("/whoami");
        user = response.data;
        store.dispatch(setProfile(user));
        return user;
    }
    catch (err) {
        return null;
    }
}

export async function sendLogin(username: string, password: string) {
    const response = await client.post("/login", { username, password });
    const user = response.data;
    store.dispatch(setProfile(user));
    return user;
}
