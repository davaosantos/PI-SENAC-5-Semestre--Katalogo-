import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './pages/login/login';

import { Routes, Switch } from 'react-router-dom';

import { BrowserRouter, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>

      <Routes>
        <Route path = '/login'  exact={true} element={<Login />}></Route>
      </Routes>
      
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
