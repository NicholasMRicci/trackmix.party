// import './login.css';

import { MouseEvent, useState } from "react";
import { sendLogin } from "../Client/client";
import { Link, RouterProvider, useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();
    const handleLogin = (event: MouseEvent<any>) => {
        setLoginFailed(false);
        event.preventDefault();
        const hashed = bcrypt.hashSync(password + username, 8);
        sendLogin(username, hashed).then((user) => {
            navigate('/Home')
        }).catch((err) => {
            setLoginFailed(true);
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <div className="container">
                <div className="row justify-content-center">
                    <form className="col-11 col-sm-8 col-md-6">
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
                <div className="row justify-content-center">
                    {loginFailed && <div className="alert alert-danger col-11 col-sm-8 col-md-6 ">Login failed</div>}
                </div>
            </div >

        </div >


    );
}

export default Login;