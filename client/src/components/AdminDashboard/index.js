import { useNavigate } from "react-router-dom";
import { UserRole } from "../../constants/UserRole";
import { useUserContext } from "../../contexts/UserContextProvider";
import SellerRequests from "../SellerRequests";

export default function AdminDashboard() {
    const { userData } = useUserContext();
    const navigate = useNavigate();
    const isAuthorized = userData?.role === UserRole.ADMIN;
    if (!isAuthorized) {
        navigate("/403");
    }
    return (
        <div className="container py-4">
            {isAuthorized && (
                <div>
                    <div className="text-center mb-4">
                        <h1 className="h3">Admin Dashboard</h1>
                        <p className="text-muted">
                            Manage seller requests and monitor activities
                        </p>
                    </div>
                    <div className="bg-light p-4 rounded shadow-sm">
                        <SellerRequests />
                    </div>
                </div>
            )}
        </div>
    );
}
