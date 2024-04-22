// import './login.css';

import { MouseEvent, useState } from "react";
import { sendLogin } from "../Client/client";
import { useNavigate } from "react-router-dom";
import { Form, formMessage } from "../Utils/forms";

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
                navigate('/Profile');
            }, 500);
        }).catch((err) => {
            setMessage({ msg: "Login Failed", type: "warning" });
        })
    }
    //  data, setData, handleLogin, message)}
    return (
        <div>
            <h1>Login</h1>
            <Form
                fields={[
                    { name: "Username", prop: "username" },
                    { name: "Password", prop: "password" }]}
                getter={data}
                setter={setData}
                submitHander={handleLogin}
                message={message}
            />

        </div >


    );
}

export default Login;