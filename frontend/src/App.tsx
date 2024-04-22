import { Provider } from "react-redux";
import './App.css';
import Navbar from './Nav/nav';
import { BrowserRouter } from "react-router-dom";
import store from './store';
import { Footer } from './Nav/footer';

import { RoutesWithAuth } from './Routes';

function App() {
  return (
    <Provider store={store}>
      <div className="App d-flex flex-column vh-100">
        <BrowserRouter>
          <Navbar />
          <div className="container d-flex justify-content-center">
            <div className="col-11 col-sm-11 col-md-11 col-lg-10 col-xl-9 mt-4">
              <RoutesWithAuth />
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
