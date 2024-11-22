import { useEffect, useState } from "react";
import Orders from "../Orders";
import { getOrdersHistory } from "../../api/buyer";

export default function OrdersHistory(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrdersHistory().then((data) => setOrders(data.content));
    }, []);
    return (
        <div className="continer">
            <h1 className="mb-3">Orders History</h1>
            <Orders orders={orders} />
        </div>
    );
}
