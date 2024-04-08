import { useEffect, useState } from "react";
import { getPosts } from "../Client/client";
import PostCard from "./card";
import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { Post, setPosts } from "./reducer";

function PostList() {
    const posts = useSelector((state: RootState) => state.postReducer.posts);
    useEffect(() => {
        getPosts().then((posts: Post[]) => store.dispatch(setPosts(posts)));
    }, []);
    return (
        <div>
            <h1>Post List</h1>
            <div className="row justify-content-center">
                <ul className="list-group list-group-flush col-6">
                    {posts.toSorted((post1: Post, post2: Post) => {
                        return post2.date.localeCompare(post1.date);
                    }).map((post: Post) => {
                        return (<li className="list-group-item" key={post._id}>
                            <PostCard post={post} />
                        </li>)
                    })}
                </ul>
            </div>


        </div>
    )
}

export default PostList;