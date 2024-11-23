import { useContext, useMemo } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import AddToCartButton from "../AddToCartButton";
import { CartContext } from "../../contexts/CartContextProvider";

export default function Product({ product }) {
  const { name, price, rating, imageUrl, quantity } = product;
  const { cartItems, addProduct, reduceProduct } = useContext(CartContext);

  const increase = () => {
    addProduct(product);
  };
  const decrease = () => {
    reduceProduct(product);
  };

  const productInfo = useMemo(() => {
    return cartItems?.find((item) => item.id === product.id);
  }, [cartItems, product.id]);

  return (
    <div className="card position-relative">
      <Link
        to={`/products/detail/${product.id}`}
        className="text-decoration-none"
      >
        <div className="position-relative">
          <img
            className="card-img-top"
            src={imageUrl}
            alt={name}
            style={{ objectFit: "cover", height: "200px" }}
          />
          {quantity == 0 && (
            <div className="out-of-stock-overlay d-flex justify-content-center align-items-center">
              <span className="text-white fw-bold">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="d-flex mt-2">
          <span className="ms-3">Stock left: {quantity}</span>
          <span className="ms-auto me-3">
            <Rating
              initialRating={rating}
              readonly={true}
              emptySymbol={<StarOutlined />}
              fullSymbol={<StarFilled />}
            />
          </span>
        </div>
        <div className="card-body">
          <h5 className="card-title">${parseFloat(price).toFixed(2)}</h5>
          <p className="card-text">{name}</p>
        </div>
      </Link>
      <div className="card-body pt-0">
        <div className="d-flex">
          {quantity > 0 && (
          <AddToCartButton
            quantity={(productInfo && productInfo.quantity) || 0}
            increase={increase}
            decrease={decrease}
          />
          )}
        </div>
      </div>
    </div>
  );
}
