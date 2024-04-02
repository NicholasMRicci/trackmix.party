// import './login.css';

import { MouseEvent, useState } from "react";
import { sendLogin } from "../Client/client";
import { Link, RouterProvider, useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();
    const handleLogin = (event: MouseEvent<any>) => {
        event.preventDefault();
        sendLogin(username, password).then((user) => {
            setLoginFailed(false);
            navigate('/Home')
        }).catch((err) => {
            setLoginFailed(true);
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <div className="d-flex justify-content-center w-100">
                <form className="mx-2" style={{ maxWidth: "500px" }}>
                    <div className="m-2 form-group">
                        <label htmlFor="inputUsername">Email address</label>
                        <input type="text" className="form-control" id="inputUsername" placeholder="Enter Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button onClick={handleLogin} type="submit" className="btn btn-primary m-2">Submit</button>
                </form>
            </div>
            {loginFailed && <div className="alert alert-danger">Login failed</div>}
        </div>


    );
}

export default Login;