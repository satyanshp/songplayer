import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { ROUTES } from "./utils/routes/routes";
import './App.css';
import ProtectedRoute from './utils/routes/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Otp from './pages/Otp';

function App() {
  const [response, setResponse] = React.useState();
  const handleResponse = (res:any) => {
    setResponse(res);
  }
  const [user, setUser] = React.useState("");
  const handleUser = (value:string) => {
    setUser(value);
  }
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
          <Route element={
            <ProtectedRoute/>
          }>
            <Route path={ROUTES.ROOT} element={<Home/>}/>
          </Route>
          <Route path={ROUTES.LOGIN} element={<Login handleResponse={handleResponse} handleUser={handleUser}/>}/>
          <Route path={ROUTES.OTP} element={<Otp response={response}user={user}/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
