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

function App() {
  useEffect(() => {
    whoAmI();
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Post" element={<CreatePost />} />
          </Routes>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;