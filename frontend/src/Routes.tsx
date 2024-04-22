import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Home/home";
import Login from "./Login/login";
import { Signup } from "./Login/signup";
import CreatePost from "./Post/create";
import { PostDetails } from "./Post/details";
import Profile from "./Profile/profile";
import { SearchPage } from "./Search/search";
import { UploadTrack } from "./Tracks/create";
import { whoAmI } from "./Client/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { UserList } from "./Admin/UserList";
import { SearchDetails } from "./Search/details";
import { OtherProfile } from "./Profile/details";

const routes = [
    { path: "/", component: <Navigate to="Home" />, public: true },
    { path: "/Home", component: <Home />, public: true },
    { path: "/Login", component: <Login />, public: true },
    { path: "/Signup", component: <Signup />, public: true },
    { path: "/Profile", component: <Profile /> },
    { path: "/Post", component: <CreatePost /> },
    { path: "/Upload", component: <UploadTrack /> },
    { path: "/Post/:id", component: <PostDetails />, public: true },
    { path: "/Search", component: <SearchPage />, public: true },
    { path: "/Details/:id", component: <SearchDetails />, public: true },
    { path: "/UserList", component: <UserList />, public: false },
    { path: "/Users/:id", component: <OtherProfile />, public: true },
    { path: "*", component: <NotFound />, public: true }
]

export function RoutesWithAuth() {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => { return state.profileReducer.user })
    const [state, setState] = useState<"loading" | "loaded" | "blocked" | "good">('loading');
    // const match = useMatches();
    useEffect(() => {
        whoAmI().then(() => {
            setState("loaded")
        }).catch(() => {
            setState("loaded")
        })
    }, []);
    useEffect(() => {
        if (state === "loading") {
            return
        }
        const route = routes.find((elem) => {
            return pathname.startsWith(elem.path)
        })
        if (!user && !route?.public && route?.path != "*") {
            console.log(route)
            setState("blocked")
            navigate("/Login")
        }
        setState("good")
    }, [pathname, user])
    return <Routes>
        {routes.map((route) => {
            return <Route key={route.path} path={route.path} element={route.component} />
        })}
    </Routes>
}

function NotFound() {
    return (
        <>
            <h1 className="m-5">Page Not Found</h1>
            <Link to={"/"}><button className="btn btn-primary">Go Home</button></Link>
        </>
    )
}