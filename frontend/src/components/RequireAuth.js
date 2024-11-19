import { useSelector, useDispatch } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import { authActions } from "../store";
import { refreshAccessToken } from "../service/fetchService";

const isTokenExpired = (token) => {
    try {
        const { exp } = jwtDecode(token); // Decode the token to get the expiration time
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return exp < currentTime; // Token is expired if expiration time is in the past
    } catch (err) {
        console.error("Failed to decode token:", err);
        return true; // Treat token as expired if decoding fails
    }
};

const RequireAuth = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    // Retrieve the access token from cookies
    const accessToken = Cookies.get("accessToken");

    useEffect(() => {
        const checkAuth = async () => {
            if (accessToken && isTokenExpired(accessToken)) {
                try {
                    // Try to refresh the access token
                    const newAccessToken = await refreshAccessToken();
                    Cookies.set("accessToken", newAccessToken, { secure: true });
                    dispatch(authActions.loginSuccessful());
                } catch (err) {
                    console.error("Failed to refresh token:", err);
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    dispatch(authActions.logout());
                }
            } else if (accessToken && !isTokenExpired(accessToken)) {
                // Token is valid, update Redux state if not already authenticated
                if (!isAuthenticated) {
                    dispatch(authActions.loginSuccessful());
                }
            } else {
                // No valid token, logout user
                dispatch(authActions.logout());
            }

            setLoading(false); // Set loading to false after checks
        };

        checkAuth();
    }, [accessToken, isAuthenticated, dispatch]);

    if (loading) {
        // Optionally, show a loading spinner while authentication checks are ongoing
        return <div>Loading...</div>;
    }

    return (
        accessToken && !isTokenExpired(accessToken) ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
};

export default RequireAuth;
