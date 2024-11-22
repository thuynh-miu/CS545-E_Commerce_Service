import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginStatusProvider";

export default function LogOut(props) {
    const {setIsLoggedIn} = useContext(LoginContext);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(() => false);
    return (
        <Navigate to={'/'} />
    )
}