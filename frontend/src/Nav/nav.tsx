import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { whoAmI } from "../Client/client";
import { setUser } from "../Profile/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const user = useSelector((state: RootState) => state.profileReducer.user);
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">trackmix.party</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Home</a>
                        </li>
                        {user &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="Profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="Post">Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="Upload">Upload Track</Link>
                                </li>
                            </>
                        }
                        {!user &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="Login">Log In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="Signup">Sign up</Link>
                                </li>
                            </>

                        }
                        {user && user.role === "admin" &&
                            <li className="nav-item">
                                <Link className="nav-link" to="UserList">User List</Link>
                            </li>
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to="Search">Search</Link>
                        </li>
                    </ul>
                    {user && <h4 className=""><FontAwesomeIcon fill="solid" color="black" icon={faUser} /> {user.username}</h4>}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;