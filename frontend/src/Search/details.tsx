import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getSong } from "../Client/client"

export function SearchDetails() {
    const { id } = useParams()
    const [song, setSong] = useState<any>()
    useEffect(() => {
        getSong(id!).then((song) => {
            console.log(song)
            setSong(song)
        })
    }, [id])
    return song ?
        <div className="card p-1" key={song._id}>
            <img className="card-img-top p-5" src={song.spotifyData.album.images[0].url}></img>
            <div className="card-body">
                <h4 className="card-title">{song.spotifyData.name}</h4>
                <h5 className="card-text">By: {song.spotifyData.artists[0].name}</h5>
                <h5 className="card-text">Album: {song.spotifyData.album.name}</h5>
                <h5 className="card-text">Duration: {song.spotifyData.duration_ms / 1000} seconds</h5>
                <h5 className="card-text">Popularity: {song.spotifyData.popularity}/100</h5>
                {song.likes && <>
                    <h5 className="card-text">Liked By: </h5>
                    {song.likes.length > 0 ? <div className="d-flex justify-content-center">
                        <ul className="list-group list-group-flush col-6">
                            {song.likes.map((like: any) => {
                                return <li className="list-group-item" key={like._id}>{like.username}</li>
                            })}
                        </ul>
                    </div> : <div className="card-text">Nobody!</div>}
                </>}
            </div>
        </div> :
        <div>Loading...</div>
}