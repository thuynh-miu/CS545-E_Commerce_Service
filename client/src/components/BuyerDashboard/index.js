import { Outlet } from "react-router-dom";


export default function BuyerDashboard(props) {
    // Check buyer permissions here

    return (
        <div className="container">
            <Outlet />
        </div>
    )
}