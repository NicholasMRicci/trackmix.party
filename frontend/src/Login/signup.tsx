import { useState } from "react";
import { Form, formMessage } from "../Utils/forms";
import { sendLogin, sendSignup } from "../Client/client";
import { useNavigate } from "react-router";


export function Signup() {
    const [data, setData] = useState({ username: "", password: "", firstName: "", lastName: "", signupKey: "" });
    const [message, setMessage] = useState<formMessage>(false);
    const navigate = useNavigate();
    const handleSignup = (event: any) => {
        setMessage(false);
        event.preventDefault();
        sendSignup(data).then((user) => {
            sendLogin(data.username, data.password).then((user) => {
                setMessage({ msg: "Signup Successful", type: "success" });
                setTimeout(() => {
                    navigate('/profile');
                }, 500);
            }).catch((err) => {
                setMessage({ msg: err.toString(), type: "warning" });
            })
        }).catch((err) => {
            setMessage({ msg: err.toString(), type: "warning" });
        })
    };
    return (
        <div>
            <h1>Sign Up</h1>
            {<Form fields={[
                { name: "Username", prop: "username" },
                { name: "Password", prop: "password" },
                { name: "First Name", prop: "firstName" },
                { name: "Last Name", prop: "lastName" },
                {
                    name: "Role", prop: "role", extra: {
                        type: "select",
                        label: "Role",
                        options: [{ value: "user", name: "User" }, { value: "admin", name: "Admin" }]
                    }
                },
                { name: "Signup Key (Class Code ex. CS1000)", prop: "signupKey" }]}
                getter={data}
                setter={setData}
                submitHander={handleSignup}
                message={message}
            />}
        </div >
    );
}