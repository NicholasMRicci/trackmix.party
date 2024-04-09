import { get } from "http";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost } from "../Client/client";
import { Post } from "./reducer";

export function PostDetails() {
    let { id } = useParams();
    const [post, setPost] = useState<Post | false>(false)
    useEffect(() => {
        getPost(id!).then((data) => {
            setPost(data);
        })
    }, [])

    if (post === false) {
        return <></>
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <audio controls>
                <source src={process.env.REACT_APP_AUDIO_URL + "/" + post.startingTrack.file} type="audio/mp4" />
            </audio>
        </div>
    )
}