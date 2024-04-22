import { useSelector } from "react-redux";
import store, { RootState } from "../store";
import { deleteTrack, getMyTracks, sendLogout, updateUser, whoAmI } from "../Client/client";
import { useNavigate } from "react-router";
import { setUser } from "./reducer";
import { useEffect, useState } from "react";
import { Form, formMessage } from "../Utils/forms";
import PostList from "../Post/list";
import { Link } from "react-router-dom";

function Profile() {
    const user = useSelector((state: RootState) => state.profileReducer.user);
    const navigate = useNavigate();
    const handleLogout = () => {
        sendLogout().then(() => {
            store.dispatch(setUser(false))
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
        console.log(user)
        if (!user) {
            navigate('/home')
        }
        getMyTracks().then((tracks) => {
            setTracks(tracks);
        }).catch((err) => {
            navigate('/home')
        })
    }, [user]);
    const [data, setData] = useState({ firstName: user.firstName, lastName: user.lastName });
    const [message, setMessage] = useState<formMessage>(false);
    const handleUpdate = () => {
        updateUser(user._id, data).then((user) => {
            whoAmI().then((user) => {
                store.dispatch(setUser(user))
                setMessage({ msg: "Update Successful", type: "success" })
                setTimeout(() => {
                    setMessage(false);
                }, 2000)
            })
        })
    }
    return (
        <div>
            {user &&
                <>
                    <h1>Welcome {user.firstName} {user.lastName}</h1>
                    <h4>Username: {user.username}</h4>
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                    <br></br>
                    <Form fields={[
                        { name: "First Name", prop: "firstName" },
                        { name: "Last Name", prop: "lastName" },
                        { name: "Password", prop: "password" }
                    ]} getter={data} setter={setData} message={message} submitHander={handleUpdate} />
                    <hr></hr>
                    <h4>You have liked {user.songLikes.length} song{(user?.songLikes.length > 1 || user?.songLikes.length === 0) ? "s" : ""}</h4>
                    <div className="row">
                        {
                            user.songLikes.map((like) => {
                                return (
                                    <div className="card col-2 p-1">
                                        <img src={like.spotifyData.album.images[2].url} alt={like.spotifyData.name} />
                                        <h5>{like.spotifyData.name}</h5>
                                        <Link to={`/details/${like.spotifyId}`}><button className="btn btn-primary p-1">Details</button></Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr></hr>
                    <h4>You have created {user.posts.length} post{(user?.posts.length > 1 || user?.posts.length === 0) ? "s" : ""}</h4>
                    <PostList posts={user.posts} showUser={false} />
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

                </>
            }
        </div >

    );
}

export default Profile;
