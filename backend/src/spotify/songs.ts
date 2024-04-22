import SpotifyWebApi from "spotify-web-api-node"
import { Express, Request, Response, urlencoded } from "express"
import { songModel } from "./songs.dao";
import { userModel } from "../users/users.dao";

function searchSong(api: SpotifyWebApi): (arg0: Request, arg1: Response) => void {
    return async (req: Request, res: Response) => {
        const title = req.query.title || "";
        const artist = req.query.artist || "";
        var query = ""
        if (title) {
            query += `track:"${title}" `
        }
        if (artist) {
            query += `artist:"${artist}" `
        }
        try {
            const tracks = await api.searchTracks(query, { market: "US" })
            res.json(tracks.body.tracks?.items.filter((track: any) => {
                return !track.explicit
            }));
        } catch (err) {
            refreshToken(api)
            console.log(err)
        }
    }
}

function likeSong(api: SpotifyWebApi): (arg0: Request, arg1: Response) => void {
    return async (req: Request, res: Response) => {
        const id = req.params.id
        try {
            var song = await songModel.findOne({ spotifyId: id })
            var user = await userModel.findOne({ _id: req.session.profile })
            const spotifySong = (await api.getTrack(id)).body
            if (!song) {
                song = await songModel.create({ spotifyId: id, spotifyData: spotifySong })
            }
            if (song.likes.findIndex((id) => { return id.toString() === req.session.profile }) !== -1) {
                res.send("Already Liked")
                return
            }
            song.likes.push(req.session.profile)
            song.save()
            user?.songLikes.push(song._id)
            user?.save()
            res.json(song)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    }
}

function getSong(api: SpotifyWebApi): (arg0: Request, arg1: Response) => void {
    return async (req: Request, res: Response) => {
        const id = req.params.id
        try {
            const song = await songModel.findOne({ spotifyId: id }).populate('likes')
            if (!song) {
                const spotifySong = (await api.getTrack(id)).body
                const song = await songModel.create({ spotifyId: id, spotifyData: spotifySong })
                res.json(song)
                return
            }
            res.json(song)
        } catch (err) {
            console.log(err)
            res.json(err)
        }
    }
}

function refreshToken(spotifyApi: SpotifyWebApi) {
    spotifyApi.clientCredentialsGrant().then(
        function (data) {
            // console.log('The access token is ' + data.body['access_token'])
            spotifyApi.setAccessToken(data.body['access_token']);
        },
        function (err) {
            console.log('Something went wrong!', err);
        }
    );
}

export function registerSpotifyRoutes(app: Express) {
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.FRONTEND_URL
    })

    refreshToken(spotifyApi)

    app.get('/search', searchSong(spotifyApi))
    app.post('/songs/:id', likeSong(spotifyApi))
    app.get('/songs/:id', getSong(spotifyApi))
}