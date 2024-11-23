import Order from "../Order";

export default function Orders({ orders }) {
  return (
    <div className="d-flex flex-column">
      {orders.map((order, index) => (
        <div key={index} className="mb-3 bg-white p-3 rounded shadow-sm">
          <Order
            id={order.id}
            status={order.status}
            order_date={order.orderDate}
            updated_date={order.updateDate}
            items={order.items}
          />
        </div>
      ))}
    </div>
  );
}
