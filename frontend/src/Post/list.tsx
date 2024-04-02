import { useEffect, useState } from "react";
import { getPosts } from "../Client/client";

function PostList() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts().then((posts) => setPosts(posts));
    }, []);
    return (
        <div>
            <h1>Post List</h1>
            {JSON.stringify(posts)}
        </div>
    )
}

export default PostList;