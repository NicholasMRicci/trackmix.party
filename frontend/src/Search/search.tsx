import { useEffect, useState } from "react";
import { MakeForm, formMessage } from "../Utils/forms";
import { likeSong, searchTracks, whoAmI } from "../Client/client";
import { useSearchParams } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { User } from "../Profile/reducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function SearchPage() {
    const [data, setData] = useState({ title: "", artist: "" });
    const [message, setMessage] = useState<formMessage>(false)
    const [tracks, setTracks] = useState<any[] | false>(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const profile = useSelector((state: RootState) => {
        return state.profileReducer.profile
    })
    const [user, setUser] = useState<User>()
    useEffect(
        () => {
            const newData = { title: searchParams.get("title") || "", artist: searchParams.get("artist") || "" }
            if (!newData.title && !newData.artist) {
                return
            }
            setData(newData)
            searchTracks(newData).then((responseData) => {
                console.log(responseData)
                setTracks(responseData)
            }).catch((e) => {
                setMessage({ msg: JSON.stringify(e), type: "warning" })
            })
        },
        [searchParams]
    )
    useEffect(() => {
        whoAmI().then((user) => {
            setUser(user)
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
            {MakeForm([{ name: "Song Title", prop: 'title' },
            { name: "Artist Name", prop: "artist" }
            ], data, setData, searchHandler, message)}
            <div className="row">
                {tracks && tracks.map((track: any) => {
                    return <div className="card col-4 p-1" key={track.id}>
                        <img className="card-img-top" src={track.album.images[1].url}></img>
                        <div className="card-body">
                            <div className="card-title">{track.name}</div>
                            <div className="card-text">By: {track.artists[0].name}</div>
                            {user
                                && user.songLikes.findIndex((like: any) => { return like.spotifyId.toString() === track.id }) !== -1 ?
                                <button disabled={true} className="btn btn-primary m-1"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button> :
                                <button onClick={() => { like(track.id) }} className="btn btn-primary m-1">Like</button>}
                        </div>
                    </div>
                })}
                {tracks && tracks.length === 0 &&
                    <div className="alert alert-warning">No results found</div>
                }
            </div >
            {JSON.stringify(user?.songLikes)}
            {JSON.stringify(tracks)}
        </>
    )
}