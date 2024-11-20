export default function Order(props) {
  const { id, status, created_date, updated_date, items, total } = props;

  return (
    <div className="container">
      <div
        className="d-flex bg-light p-3 rounded-top border border-bottom-0"
        id={`order-${id}-header`}
      >
        <span className="my-auto">Order# {id}</span>
        <button className="btn ms-auto">Actions</button>
      </div>
      <div className="d-flex p-3 border border-top-0 border-bottom-0">
        <span className="my-auto me-3">Status:</span>
        <span className="badge bg-success p-3 my-auto">{status}</span>
        <span className="my-auto ms-auto">
          <small>Updated at </small>
          <h5>
            <b>
              {updated_date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </b>
          </h5>
        </span>
      </div>
      <div className="d-flex p-3 border border-top-0 rounded-bottom">
        {items.map((item) => (
          <img src={item.img_url} width={60} height={60} />
        ))}
      </div>
    </div>
  );
}
