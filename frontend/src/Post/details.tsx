import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost } from "../Client/client";
import { Post } from "./reducer";

export function PostDetails() {
    let { id } = useParams();
    const [post, setPost] = useState<Post | false>(false)
    const [audioGone, setAudioGone] = useState(false);
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
            {audioGone ?
                <div className="alert alert-warning">Audio Deleted</div> :
                <audio controls>
                    <source src={process.env.REACT_APP_AUDIO_URL + "/" + post.startingTrack.file} type={post.startingTrack.mime_type} onError={() => { setAudioGone(true) }} />
                </audio>
            }
        </div>
    )
}