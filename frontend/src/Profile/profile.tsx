import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { sendLogout } from "../Client/client";
import { useNavigate } from "react-router";
import { setProfile } from "./reducer";

function Profile() {
    const profile = useSelector((state: RootState) => state.profileReducer.profile);
    const navigate = useNavigate();
    const handleLogout = () => {
        sendLogout().then(() => {
            store.dispatch(setProfile({}));
            navigate("/home");
        })
    };
    return (
        <div>
            <h1>Welcome {profile.firstName} {profile.lastName}</h1>
            <p>Username: {profile.username}</p>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;