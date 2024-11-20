import { Outlet } from "react-router-dom";


export default function SellerDashboard(props) {
    // Check permissions here

    return (
        <div className="container">
            <Outlet />
        </div>
    )
}