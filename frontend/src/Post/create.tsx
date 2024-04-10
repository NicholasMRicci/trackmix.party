import { MouseEvent, useEffect, useState } from "react";
import { createPost, getMyTracks } from "../Client/client";
import { useNavigate } from "react-router";
import { FormContainer } from "../Utils/forms";

function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [track, setTrack] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (event: MouseEvent<any>) => {
        event.preventDefault();
        createPost({ title, description, startingTrack: track }).
            then((data) => {
                setDescription('');
                setTitle('');
                setMessage('Post created successfully');
                setTimeout(() => {
                    setMessage('');
                }, 5000)
            }).catch((err) => {
                alert(err.response.data);
            })
    };
    const [availableTracks, setAvailableTracks] = useState<any[]>([]);
    useEffect(() => {
        getMyTracks().then((data) => {
            setAvailableTracks(data);
            if (data.length > 0) {
                setTrack(data[0]._id);
            }
        }).catch((err) => {
            alert(err.response.data);
        })
    }, []);
    return (
        <div className="container">
            <h1>Create Post</h1>
            <FormContainer>
                <div>
                    <label htmlFor="titleInput">Title</label>
                    <input value={title} onChange={(e) => { setTitle(e.target.value) }} id="titleInput" className="form-control" type="text" required={true} />
                </div>
                <div className="form-group">
                    <label htmlFor="descriptionInput">Description</label>
                    <textarea className="form-control" id="descriptionInput" rows={3} value={description} onChange={(e) => { setDescription(e.target.value) }} required={true}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="trackSelect">Track</label>
                    <select className="form-control" id="trackSelect" onChange={(e) => { setTrack(e.target.value) }} required={true} >
                        {availableTracks.map((track) => {
                            return <option key={track._id} value={track._id}>{track.title}</option>
                        })}
                    </select>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary m-2" type="submit">Create</button>
                <div className="row justify-content-center">
                    {message && <div className="alert alert-info col-11 col-sm-9 col-md-6">{message}</div>}
                </div>
            </FormContainer>
        </div>
    );
}

export default CreatePost;