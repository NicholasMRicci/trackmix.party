import { useEffect, useState } from "react";
import { Form, formMessage } from "../Utils/forms";
import { likeSong, searchTracks, whoAmI } from "../Client/client";
import { Link, useSearchParams } from "react-router-dom";
import store, { RootState } from "../store";
import { useSelector } from "react-redux";
import { setUser } from "../Profile/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function SearchPage() {
    const [data, setData] = useState({ title: "", artist: "" });
    const [message, setMessage] = useState<formMessage>(false)
    const [tracks, setTracks] = useState<any[] | false>(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const user = useSelector((state: RootState) => {
        return state.profileReducer.user
    })
    useEffect(
        () => {
            const newData = { title: searchParams.get("title") || "", artist: searchParams.get("artist") || "" }
            if (!newData.title && !newData.artist) {
                return
            }
            setData(newData)
            searchTracks(newData).then((responseData) => {
                setTracks(responseData)
                if (responseData.length === 0) {
                    setMessage({ msg: "No tracks found", type: "warning" })
                }
            }).catch((e) => {
                setMessage({ msg: JSON.stringify(e), type: "warning" })
            })
        },
        [searchParams]
    )
    useEffect(() => {
        whoAmI().then((user) => {
            store.dispatch(setUser(user))
        })
    }, [])
    const searchHandler = (e: any) => {
        e.preventDefault();
        setSearchParams(data);
    }
    const like = (trackId: any) => {
        likeSong(trackId).then((resp: any) => {
            whoAmI().then((user) => {
                setUser(user)
            })
        })
    }
    return (
        <>
            <h1>Search Tracks</h1>
            <Form fields={[{ name: "Song Title", prop: 'title' },
            { name: "Artist Name", prop: "artist" }
            ]}
                getter={data}
                setter={setData}
                submitHander={searchHandler}
                message={message}
            />
            <div className="row">
                {tracks && tracks.map((track: any) => {
                    return <div className="card col-4 p-1" key={track.id}>
                        <img className="card-img-top" src={track.album.images[1].url} alt="album cover"></img>
                        <div className="card-body">
                            <h5 className="card-title">{track.name}</h5>
                            <div className="card-text">{track.artists[0].name}</div>
                            <Link to={"/details/" + track.id}><button className="btn btn-primary m-1">Details</button></Link>
                            {user
                                && (user.songLikes.findIndex((like: any) => { return like.spotifyId.toString() === track.id }) !== -1 ?
                                    <button disabled={true} className="btn btn-primary m-1"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button> :
                                    <button onClick={() => { like(track.id) }} className="btn btn-primary m-1">Like</button>)}
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}