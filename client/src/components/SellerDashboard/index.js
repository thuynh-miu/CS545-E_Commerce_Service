import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContextProvider";
import { UserRole } from "../../constants/UserRole";

export default function SellerDashboard(props) {
    // Check permissions here
    const { userData } = useUserContext();
    const navigate = useNavigate();
    const isAuthorized = userData?.role === UserRole.SELLER;
    if (!isAuthorized) {
        navigate("/403");
    }
    return <div className="container">{isAuthorized && <Outlet />}</div>;
}
