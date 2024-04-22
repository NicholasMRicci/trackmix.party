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
    { path: "/", component: <Navigate to="home" />, public: true },
    { path: "/home", component: <Home />, public: true },
    { path: "/login", component: <Login />, public: true },
    { path: "/register", component: <Signup />, public: true },
    { path: "/post", component: <CreatePost /> },
    { path: "/upload", component: <UploadTrack /> },
    { path: "/post/:id", component: <PostDetails />, public: true },
    { path: "/search", component: <SearchPage />, public: true },
    { path: "/details/:id", component: <SearchDetails />, public: true },
    { path: "/userList", component: <UserList />, public: false },
    { path: "/profile/:id", component: <OtherProfile />, public: true },
    { path: "/profile", component: <Profile /> },
    { path: "*", component: <NotFound />, public: true }
]

export function RoutesWithAuth() {
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => { return state.profileReducer.user })
    const [state, setState] = useState<"loading" | "loaded" | "blocked" | "good">('loading');
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
            return pathname.toLowerCase().startsWith(elem.path)
        })
        if (!user && !route?.public && route?.path !== "*") {
            setState("blocked")
            navigate("/login")
        }
        setState("good")
    }, [pathname, user, navigate])
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