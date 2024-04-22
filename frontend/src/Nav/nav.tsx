import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const user = useSelector((state: RootState) => state.profileReducer.user);
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">trackmix.party</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        {user &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/post">Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/upload">Upload Track</Link>
                                </li>
                            </>
                        }
                        {!user &&
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Log In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Sign up</Link>
                                </li>
                            </>

                        }
                        {user && user.role === "admin" &&
                            <li className="nav-item">
                                <Link className="nav-link" to="/userList">User List</Link>
                            </li>
                        }
                        <li className="nav-item">
                            <Link className="nav-link" to="/search">Search</Link>
                        </li>
                    </ul>
                    {user && <h4 className=""><FontAwesomeIcon fill="solid" color="black" icon={faUser} /> {user.username}</h4>}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;