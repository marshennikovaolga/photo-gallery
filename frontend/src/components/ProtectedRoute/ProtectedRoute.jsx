import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ loggedIn }) {
    return loggedIn ? <Outlet/> : <Navigate to='sign-in' replace/>
};