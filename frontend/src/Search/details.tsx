import { useEffect, useState } from "react"
import { useParams } from "react-router"

export function SearchDetails() {
    const trackId = useParams().id
    const [track, setTrack] = useState<any>()
    useEffect(() => {

    }, [trackId])
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
}