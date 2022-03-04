import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

const useAuth = () => {
    return localStorage.getItem("isAuthenticated");
}

const ProtectedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Login />;
}

export default ProtectedRoute;