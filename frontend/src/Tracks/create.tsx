import { useState } from "react";
import { FormContainer } from "../Utils/forms"
import { uploadTrack } from "../Client/client";

export function UploadTrack() {

    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string | false>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (file) {
            console.log(file)
            const data = new FormData();
            data.append("title", title);
            data.append("file", file);

            try {
                // You can write the URL of your server or any other endpoint used for file upload
                uploadTrack(data).then(() => {
                    setMessage("File uploaded successfully");
                    setTimeout(() => {
                        setMessage(false);
                    }, 1000)
                    setFile(null);
                })
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <FormContainer>
            <div className="m-2 form-group">
                <label htmlFor="formTitle" className="form-label">Title</label>
                <input className="form-control" id="formTitle" type="text" value={title} placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="formFileLg" className="form-label">Choose file</label>
                <input className="form-control" id="formFileLg" type="file" accept="audio/*" onChange={handleFileChange} />
            </div>
            <button onClick={handleUpload} className="btn btn-primary m-2" type="submit">Upload</button>
            {message && message}
        </FormContainer>
    )
}