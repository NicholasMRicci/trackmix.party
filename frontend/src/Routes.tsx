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
    { path: "*", component: <NotFound />, public: true }
]

export function RoutesWithAuth() {
    const location = useLocation();
    const { hash, pathname, search } = location;
    const navigate = useNavigate()
    const profile = useSelector((state: RootState) => { return state.profileReducer.profile })
    const [isInit, setIsInit] = useState(false);
    useEffect(() => {
        whoAmI().then(() => {
            setIsInit(true)
        }).catch(() => {
            setIsInit(true)
        })
    }, []);
    useEffect(() => {
        console.log(isInit)
        if (!isInit) {
            return
        }
        const route = routes.find((elem) => {
            return elem.path === pathname
        })
        if (!profile && !route?.public && route?.path != "*") {
            navigate("/")
        }
    }, [pathname, profile])

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