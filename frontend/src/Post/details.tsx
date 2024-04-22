import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPost } from "../Client/client";
import { Post } from "./reducer";
import { Link } from "react-router-dom";

export function PostDetails() {
    let { id } = useParams();
    const [post, setPost] = useState<Post | false>(false)
    const [audioGone, setAudioGone] = useState(false);
    useEffect(() => {
        getPost(id!).then((data) => {
            setPost(data);
        })
    }, [id])

    if (post === false) {
        return <></>
    }
    return (
        <div>
            <h1>{post.title}</h1>
            <h5>{post.description}</h5>
            <h5>By: {post.user.username}</h5>
            {post.inspiredBy && <>
                <h5 className="">Inspired By:</h5>
                <div className="row justify-content-center m-2">
                    <div className="card col-2 p-1">
                        <img src={post.inspiredBy.spotifyData.album.images[2].url} alt={post.inspiredBy.spotifyData.name} />
                        <h5>{post.inspiredBy.spotifyData.name}</h5>
                        <Link to={`/details/${post.inspiredBy.spotifyId}`}><button className="btn btn-primary p-1">Details</button></Link>
                    </div>
                </div>
            </>
            }
            {audioGone ?
                <div className="alert alert-warning">Audio Deleted</div> :
                <audio className="m-2" controls>
                    <source src={process.env.REACT_APP_AUDIO_URL + "/" + post.startingTrack.file} type={post.startingTrack.mime_type} onError={() => { setAudioGone(true) }} />
                </audio>
            }
        </div>
    )
}