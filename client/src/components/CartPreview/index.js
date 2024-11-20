import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function CartPreview(props) {
  const { cartItems } = props;
  const total = useMemo(() => {
    return cartItems
      .map((item) => item.price * item.quantity)
      .reduce((acc, p) => acc + p, 0);
  }, [cartItems]);

  return (
    <div className="d-flex flex-column border p-3">
      <Link to={"/checkout"} className="w-100">
        <button
          className="btn btn-primary p-2 w-100"
          style={{ borderRadius: "9999px" }}
        >
          <b>Continue to checkout</b>
        </button>
      </Link>
      <hr />
      <div className="d-flex">
        <p>
          <b>Total</b>
        </p>
        <p className="ms-auto">
          <b>${parseFloat(total).toFixed(2)}</b>
        </p>
      </div>
    </div>
  );
}
