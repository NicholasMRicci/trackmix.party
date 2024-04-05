import { useState } from "react";
import { MakeForm, formMessage } from "../Utils/forms";
import { sendSignup } from "../Client/client";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router";


export function Signup() {
    const [data, setData] = useState({ username: "", password: "", firstName: "", lastName: "" });
    const [message, setMessage] = useState<formMessage>(null);
    const navigate = useNavigate();
    const handleSignup = (event: any) => {
        setMessage(null);
        event.preventDefault();
        const newData = {
            ...data, password: bcrypt.hashSync(data.password + data.username, 8)
        };
        sendSignup(newData).then((user) => {
            navigate('/Login')
        }).catch((err) => {
            setMessage({ msg: err.toString(), type: "warning" });
        })
    };
    return (
        <div>
            <h1>Sign Up</h1>
            {MakeForm([
                { name: "Username", prop: "username" },
                { name: "Password", prop: "password" },
                { name: "First Name", prop: "firstName" },
                { name: "Last Name", prop: "lastName" },
                { name: "Signup Key (Class Number)", prop: "signupKey" }],
                data, setData, handleSignup, message)}
        </div >
    );
}