import Orders from "../Orders";
import { getOrdersHistory } from "../../api/buyer";
import { useEffect, useState } from "react";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await getOrdersHistory();
        const formattedOrders = res?.map((order) => ({
          id: order.id,
          status: order.status,
          created_date: new Date(order.orderDate),
          updated_date: new Date(order.updateDate),
          items: order.items.map((item) => ({
            img_url: item.imageUrl,
          }))
        }));
        setOrders(formattedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="h4">Your Orders</h1>
        <p className="text-muted">Manage and view your recent orders</p>
      </div>
      <div className="bg-light p-4 rounded shadow-sm">
        {orders.length > 0 ? (
          <Orders orders={orders} />
        ) : (
          <p className="text-center text-muted">You have no orders yet.</p>
        )}
      </div>
    </div>
  );
}
