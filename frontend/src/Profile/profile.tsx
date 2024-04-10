import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { deleteTrack, getMyTracks, sendLogout } from "../Client/client";
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
    const handleDelete = (trackId: string) => {
        deleteTrack(trackId).then(() => {
            const newTracks = tracks.filter((track) => {
                return track._id !== trackId
            })
            setTracks(newTracks)
        }
        )
    }
    useEffect(() => {
        if (!profile.username) {
            navigate('/home')
        }
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
                    <div className="row my-5" key={track._id}>
                        <h3 className="col-4">{track.title}</h3>
                        <audio controls className="col-6">
                            <source src={process.env.REACT_APP_AUDIO_URL + "/" + track.file} type={track.mime_type} />
                        </audio>
                        <button className="btn btn-danger col-2" onClick={() => { handleDelete(track._id) }}>Delete</button>
                    </div>
                )
            })}
        </div>
    );
}

export default Profile;