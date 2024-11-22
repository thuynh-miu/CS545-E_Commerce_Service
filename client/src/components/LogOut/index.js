import { Navigate } from "react-router-dom";

export default function LogOut(props) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    return (
        <Navigate to={'/'} />
    )
}