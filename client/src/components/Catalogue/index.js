import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { Link } from "react-router-dom";
import { UserRole } from "../../constants/UserRole";
import _ from "lodash";
export default function CataLogue(props) {
    const { userData } = useContext(UserContext);

    const role = userData?.role;

    return (
        <div className="d-flex bg-light bg-gradient">
            <div className="mx-auto">
                {_.isEqual(role, UserRole.BUYER) && (
                    <Link to={"/buyer/orders"}>
                        <button className="btn">Orders History</button>
                    </Link>
                )}
                {_.isEqual(role, UserRole.ADMIN) && (
                    <Link to={"/admin"}>
                        <button className="btn">Seller Requests</button>
                    </Link>
                )}
                {_.isEqual(role, UserRole.SELLER) && (
                    <Link to={"/seller/orders"}>
                        <button className="btn">Order Management</button>
                    </Link>
                )}
                {_.isEqual(role, UserRole.SELLER) && (
                    <Link to={"/seller/inventories"}>
                        <button className="btn">Inventory Management</button>
                    </Link>
                )}
            </div>
        </div>
    );
}
