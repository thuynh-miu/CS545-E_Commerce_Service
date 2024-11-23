import Order from "../Order";

export default function Orders({ orders }) {
  return (
    <div className="d-flex flex-column gap-3 p-4 bg-light rounded">
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="mb-3 bg-white p-3 rounded shadow-sm border">
            <Order
              id={order.id}
              status={order.status}
              order_date={order.orderDate} // Fixed field name
              updated_date={order.updateDate} // Fixed field name
              items={order.items}
            />
          </div>
        ))
      ) : (
        <div className="text-center p-5 bg-white rounded shadow-sm">
          <h5 className="text-muted">No orders found</h5>
          <p className="text-muted">It looks like you haven't placed any orders yet.</p>
        </div>
      )}
    </div>
  );
}
