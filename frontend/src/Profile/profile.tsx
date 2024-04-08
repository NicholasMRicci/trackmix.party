import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { getMyTracks, sendLogout } from "../Client/client";
import { useNavigate } from "react-router";
import { setProfile } from "./reducer";
import { useEffect, useState } from "react";

function Profile() {
    const profile = useSelector((state: RootState) => state.profileReducer.profile);
    const navigate = useNavigate();
    const handleLogout = () => {
        sendLogout().then(() => {
            store.dispatch(setProfile({}));
            navigate("/home");
        })
    };
    const [tracks, setTracks] = useState<any[]>([]);
    useEffect(() => {
        getMyTracks().then((tracks) => {
            setTracks(tracks);
        });
    }, []);
    return (
        <div>
            <h1>Welcome {profile.firstName} {profile.lastName}</h1>
            <p>Username: {profile.username}</p>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            <hr></hr>
            <h2>Your Tracks</h2>
            {tracks.map((track) => {
                return (
                    <div key={track._id}>
                        <h3>{track.title}</h3>
                        <audio controls>
                            <source src={process.env.REACT_APP_AUDIO_URL + "/" + track.file} />
                        </audio>
                    </div>
                )
            })}

        </div>
    );
}

export default Profile;