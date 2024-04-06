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

client.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
        store.dispatch(setProfile({}));
    }
    return Promise.reject(error);
});

export async function getPosts() {
    const response = await client.get("/posts");
    return response.data;
}

export async function createPost(data: { title: string, description: string }) {
    return (await client.post("/posts", data)).data;
}

export async function sendDeletePost(postId: string) {
    return await client.delete(`/posts/${postId}`);
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

export async function sendSignup(data: { username: string, password: string, firstName: string, lastName: string }) {
    const response = await client.post("/users", data);
    const user = response.data;
    store.dispatch(setProfile(user));
    return user;
}

export async function sendLogout() {
    return await client.post("/logout");
}
