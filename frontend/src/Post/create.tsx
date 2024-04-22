import { MouseEvent, useEffect, useState } from "react";
import { createPost, getMyTracks } from "../Client/client";
import { Form, formMessage } from "../Utils/forms";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function CreatePost() {
    const user = useSelector((state: RootState) => state.profileReducer.user);
    const [data, setData] = useState({ title: "", description: "", startingTrack: "", inspiredBy: "" });
    const [message, setMessage] = useState<formMessage>(false);
    const handleSubmit = (event: MouseEvent<any>) => {
        event.preventDefault();
        createPost(data).
            then((data) => {
                setData({ title: "", description: "", startingTrack: "", inspiredBy: "" });
                setMessage({ msg: 'Post created successfully', type: "success" });
                setTimeout(() => {
                    setMessage(false);
                }, 5000)
            }).catch((err) => {
                setMessage({ msg: err.response.data, type: "warning" })
            })
    };
    const [availableTracks, setAvailableTracks] = useState<any[]>([]);
    useEffect(() => {
        getMyTracks().then((data) => {
            setAvailableTracks(data);
        }).catch((err) => {
            setMessage({ msg: err.response.data, type: "warning" })
        })
    }, []);
    return (
        <div className="container">
            <h1>Create Post</h1>
            <Form fields={[
                { name: "Title", prop: "title" },
                { name: "Description", prop: "description" },
                {
                    name: "Track", prop: "startingTrack", extra: {
                        type: "select",
                        label: "Track",
                        options: availableTracks ? availableTracks.map((track) => {
                            return { value: track._id, name: track.title }
                        }) : []
                    }
                },
                {
                    name: "Inspired By", prop: "inspiredBy", extra: {
                        type: "select",
                        label: "Song",
                        options: user.songLikes ? user.songLikes.map((like) => { return { value: like._id, name: like.spotifyData.name } }) : []
                    }
                },
            ]}
                getter={data}
                setter={setData}
                submitHander={handleSubmit}
                message={message}
            />
        </div >
    );
}

export default CreatePost;