import { PlusOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import AddToCartButton from "../AddToCartButton";
import { useState } from "react";

export default function Product({ product }) {
  const { name, price, rating, img_url } = product;

  const [quantity, setQuantity] = useState(0);
  const increase = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const decrease = () => {
    setQuantity((quantity) => quantity - 1);
  };

  return (
    <div className="card">
      <Link
        to={`/products/detail/${product.id}`}
        className="text-decoration-none"
      >
        <img className="card-img-top" src={img_url} />
        <div className="d-flex">
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
          <p className="card-text">
            <div>{name}</div>
          </p>
        </div>
      </Link>
      <div className="card-body pt-0">
        <div className="d-flex">
          <AddToCartButton
            quantity={quantity}
            increase={increase}
            decrease={decrease}
          />
        </div>
      </div>
    </div>
  );
}
