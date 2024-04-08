// import './login.css';

import { MouseEvent, useState } from "react";
import { sendLogin } from "../Client/client";
import { Link, RouterProvider, useNavigate } from "react-router-dom";
import { MakeForm, formMessage } from "../Utils/forms";

function Login() {
    const [data, setData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState<formMessage>(false);
    const navigate = useNavigate();
    const handleLogin = (event: MouseEvent<any>) => {
        setMessage(false);
        event.preventDefault();
        sendLogin(data.username, data.password).then((user) => {
            setMessage({ msg: "Login Successful", type: "success" });
            setTimeout(() => {
                navigate('/Home');
            }, 1000);
        }).catch((err) => {
            setMessage({ msg: "Login Failed", type: "warning" });
        })
    }
    return (
        <div>
            <h1>Login</h1>
            {MakeForm([
                { name: "Username", prop: "username" },
                { name: "Password", prop: "password" }],
                data, setData, handleLogin, message)}
        </div >


    );
}

export default Login;