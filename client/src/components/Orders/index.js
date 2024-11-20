import Order from "../Order";

export default function Orders(props) {
  const { orders } = props;

  return (
    <div className="d-flex flex-column">
      {orders.map((order) => (
        <div className="mb-3">
          <Order
            id={order.id}
            status={order.status}
            updated_date={order.updated_date}
            items={order.items}
          />
        </div>
      ))}
    </div>
  );
}
