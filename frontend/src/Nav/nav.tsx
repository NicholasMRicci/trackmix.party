import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

function Navbar() {
    const profile = useSelector((state: RootState) => state.profileReducer.profile);
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
                        <li className="nav-item">
                            {profile.username ? <Link className="nav-link" to="Profile">Profile</Link> : <Link className="nav-link" to="Login">Log In</Link>}
                        </li>
                        {profile.username &&
                            <li className="nav-item">
                                <Link className="nav-link" to="Post">Post</Link>
                            </li>}
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;