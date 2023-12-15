import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";

// interface ProtectedRouteProp {
//     // children: any;
//     loggedUser:(name:string,password:string)=>void;
// }

const ProtectedRoute = () => {
 
    let location = useLocation();

    //@ts-ignore
    return JSON.parse(localStorage.getItem("user"))
    ? <Outlet />
    : (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // <-- pass location in route state
      />
    );

};

export default ProtectedRoute;