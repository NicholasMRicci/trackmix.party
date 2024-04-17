import { useEffect } from 'react';
import { Provider } from "react-redux";
import './App.css';
import Navbar from './Nav/nav';
import { HashRouter, useLocation, useNavigate } from "react-router-dom";
import store from './store';
import { Footer } from './Nav/footer';

import { RoutesWithAuth } from './Routes';

function App() {
  return (
    <Provider store={store}>
      <div className="App d-flex flex-column vh-100">
        <HashRouter>
          <Navbar />
          <div className="container d-flex justify-content-center">
            <div className="col-12 col-sm-11 col-md-10 col-lg-7">
              <RoutesWithAuth />
            </div>
          </div>
          <Footer />
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
