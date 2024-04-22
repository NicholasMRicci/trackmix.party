import axios from "axios";
import store from "../store";
import { setUser } from "../Profile/reducer";

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
        store.dispatch(setUser(false))
    }

    return Promise.reject(error);
});

export async function getPosts() {
    const response = await client.get("/posts");
    return response.data;
}

export async function getPost(id: string) {
    const response = await client.get("/posts/" + id);
    return response.data;
}

export async function getUsers() {
    return (await client.get("/users")).data;
}

export async function getUser(userId: string) {
    return (await client.get("/users/" + userId)).data;
}

export async function updateUser(userId: string, data: { firstName: string, lastName: string }) {
    return (await client.put("/users/" + userId, data)).data;
}

// Delete User
export async function deleteUser(userId: string) {
    return await client.delete("/users/" + userId);
}

export async function createPost(data: { title: string, description: string, startingTrack: string, inspiredBy: string }) {
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
        store.dispatch(setUser(user));
        return user;
    }
    catch (err) {
        store.dispatch(setUser(false));
        return false;
    }
}

export async function sendLogin(username: string, password: string) {
    const response = await client.post("/login", { username, password });
    const user = response.data;
    store.dispatch(setUser(user));
    return user;
}

export async function sendSignup(data: { username: string, password: string, firstName: string, lastName: string }) {
    const response = await client.post("/users", data);
    const user = response.data;
    return user;
}

export async function getMyTracks() {
    return (await client.get("/tracks")).data;
}

export async function getSong(songId: string) {
    return (await client.get("/songs/" + songId)).data;
}

export async function uploadTrack(data: FormData) {
    return await client.post("/tracks", data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function deleteTrack(trackId: string) {
    return await client.delete("/tracks/" + trackId)
}

export async function sendLogout() {
    return await client.post("/logout");
}

export async function searchTracks(data: { title: string, artist: string }) {
    const params = new URLSearchParams();
    params.append('title', data.title);
    params.append('artist', data.artist);
    return (await client.get("/search", { params })).data
}

export async function likeSong(trackId: string) {
    return await client.post("/songs/" + trackId)
}