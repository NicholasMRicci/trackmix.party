import { MouseEvent, useState } from "react";
import { createPost } from "../Client/client";
import { useNavigate } from "react-router";

function CreatePost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [disabled, setDisabled] = useState(false);
    const handleSubmit = (event: MouseEvent<any>) => {
        event.preventDefault();
        createPost({ title, description }).
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
    return (
        <div className="container">
            <h1>Create Post</h1>
            <div className="row justify-content-center">
                <form className="col-11 col-sm-8 col-md-6" noValidate={true}>
                    <div>
                        <label htmlFor="titleInput">Title</label>
                        <input value={title} onChange={(e) => { setTitle(e.target.value) }} id="titleInput" className="form-control" type="text" required={true} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptionInput">Description</label>
                        <textarea className="form-control" id="descriptionInput" rows={3} value={description} onChange={(e) => { setDescription(e.target.value) }} required={true}></textarea>
                    </div>
                    <button disabled={disabled} onClick={handleSubmit} className="btn btn-primary m-2" type="submit">Create</button>
                </form>
            </div>
            <div className="row justify-content-center">
                {message && <div className="alert alert-info col-11 col-sm-8 col-md-6">{message}</div>}
            </div>
        </div>
    );
}

export default CreatePost;