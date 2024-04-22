import { useState } from "react";
import { uploadTrack } from "../Client/client";
import { Form, formMessage } from "../Utils/forms";

export function UploadTrack() {
    const [data, setData] = useState<{ title: string, file: File | null }>({ title: "", file: null });
    const [message, setMessage] = useState<formMessage>(false);
    const [disabled, setDisabled] = useState(false);

    const handleUpload = () => {
        if (data.file) {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("file", data.file);
            formData.append("mime_type", data.file.type);

            try {
                setDisabled(true)
                uploadTrack(formData).then(() => {
                    setMessage({ msg: "File uploaded successfully", type: "success" });
                    setTimeout(() => {
                        setMessage(false);
                    }, 2500)
                    setData({ ...data, title: "" })
                    setDisabled(false)
                }).catch((err) => {
                    setMessage({ msg: "File Upload failed", type: "warning" });
                    setDisabled(false)
                    setTimeout(() => {
                        setMessage(false);
                    }, 2500)
                });
            } catch (error) {
                setMessage({ msg: "File upload failed", type: "warning" });
                setDisabled(false)
                setTimeout(() => {
                    setMessage(false);
                }, 2500)
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