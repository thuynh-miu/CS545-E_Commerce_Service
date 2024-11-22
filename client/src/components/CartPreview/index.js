import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function CartPreview({ cartItems }) {
  const total = useMemo(() => {
    return cartItems
      .map((item) => item.price * item.quantity)
      .reduce((acc, p) => acc + p, 0);
  }, [cartItems]);

  return (
    <div className="bg-light p-4 rounded shadow-sm">
      <Link to="/checkout" className="w-100 mb-3">
        <button className="btn btn-primary w-100 py-2 rounded-pill">
          <b>Continue to Checkout</b>
        </button>
      </Link>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-0 fw-bold">Total</p>
        <p className="mb-0 fw-bold text-primary">${total.toFixed(2)}</p>
      </div>
    </div>
  );
}
