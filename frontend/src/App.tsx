import { useEffect } from 'react';
import { Provider } from "react-redux";
import './App.css';
import Home from './Home/home';
import Navbar from './Nav/nav';
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import store from './store';
import { whoAmI } from './Client/client';
import { setProfile } from './Profile/reducer';
import Login from './Login/login';
import Profile from './Profile/profile';
import CreatePost from './Post/create';
import { Footer } from './Nav/footer';
import { Signup } from './Login/signup';
import { UploadTrack } from './Tracks/create';
import { PostDetails } from './Post/details';

function App() {
  useEffect(() => {
    whoAmI();
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <HashRouter>
          <Navbar />
          <div className="container d-flex justify-content-center" style={{ minHeight: "88vh" }}>
            <div className="col-11 col-sm-9 col-md-6 ">
              <Routes>
                <Route path="/" element={<Navigate to="Home" />} />
                <Route path="Home" element={<Home />} />
                <Route path="Login" element={<Login />} />
                <Route path="Signup" element={<Signup />} />
                <Route path="Profile" element={<Profile />} />
                <Route path="Post" element={<CreatePost />} />
                <Route path="Upload" element={<UploadTrack />} />
                <Route path="Post/:id" element={<PostDetails />} />
              </Routes></div>
          </div>
          <Footer />
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
