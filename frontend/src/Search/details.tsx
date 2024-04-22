import { useEffect, useState } from "react"
// import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { getSong } from "../Client/client"

export function SearchDetails() {
    const { id } = useParams()
    const [song, setSong] = useState<any>()
    // const user = useSelector((state: any) => state.profileReducer.user)
    useEffect(() => {
        getSong(id!).then((song) => {
            console.log(song)
            setSong(song)
        })
    }, [id])
    return song ?
        <div className="card p-1" key={song._id}>
            <img className="card-img-top" src={song.spotifyData.album.images[1].url}></img>
            <div className="card-body">
                <h4 className="card-title">{song.spotifyData.name}</h4>
                <div className="card-text">By: {song.spotifyData.artists[0].name}</div>
                <div className="card-text">Album: {song.spotifyData.album.name}</div>
                <div className="card-text">Duration: {song.spotifyData.duration_ms / 1000} seconds</div>
                <div className="card-text">Popularity: {song.spotifyData.popularity}</div>
                {song.likes && <>
                    <div className="card-text">Liked By: </div>
                    <div className="d-flex justify-content-center">
                        <ul className="list-group list-group-flush col-6">
                            {song.likes.map((like: any) => {
                                return <li className="list-group-item" key={like._id}>{like.username}</li>
                            })}
                        </ul>
                    </div></>}
            </div>
        </div> :
        <div>Loading...</div>
}