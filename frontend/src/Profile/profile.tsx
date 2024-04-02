import { useSelector } from "react-redux";
import { RootState } from "../store";

function Profile() {
    const profile = useSelector((state: RootState) => state.profileReducer.profile);
    return (
        <div>
            <h1>Welcome {profile.firstName} {profile.lastName}</h1>
            <p>Username: {profile.username}</p>

        </div>
    );
}

export default Profile;