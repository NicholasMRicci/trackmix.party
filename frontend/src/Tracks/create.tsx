import { useState } from "react";
import { uploadTrack } from "../Client/client";
import { Form, formMessage } from "../Utils/forms";

export function UploadTrack() {
    const [data, setData] = useState<{ title: string, file: File | null }>({ title: "", file: null });
    const [message, setMessage] = useState<formMessage>(false);
    const [disabled, setDisabled] = useState(false);

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         setFile(e.target.files[0]);
    //     }
    // };

    const handleUpload = () => {
        if (data.file) {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("file", data.file);
            formData.append("mime_type", data.file.type);

            try {
                // You can write the URL of your server or any other endpoint used for file upload
                setDisabled(true)
                uploadTrack(formData).then(() => {
                    setMessage({ msg: "File uploaded successfully", type: "success" });
                    setTimeout(() => {
                        setMessage(false);
                    }, 1000)
                    setData({ ...data, title: "" })
                    setDisabled(false)
                })
            } catch (error) {
                console.error(error);
                setDisabled(false)
            }
        }
    }

    return (
        <Form fields={[
            { name: "Title", prop: "title" },
            { name: "File", prop: "file", extra: { type: "file", mime_type: "audio/*" } }
        ]} getter={data} setter={setData} submitHander={handleUpload} message={message} disabled={disabled} />
    )
}