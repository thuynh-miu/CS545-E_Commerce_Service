import {useEffect, useState} from "react";
import AddToCartButton from "../AddToCartButton";
import ProductReview from "../ProductReviews";
import {Link, useParams} from "react-router-dom";
import Rating from "react-rating";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import axios from "axios";

export default function ProductDetailPage(props) {
  const [productDetail, setProductDetail] = useState(null);
  // get id from http://localhost:3000/products/detail/2
  const { productId } = useParams();

  useEffect(() => {
    // fetch product detail from API http://localhost:8080/api/v1/products/1
    axios.get(`http://localhost:8080/api/v1/products/${productId}`).then((res) => {
      setProductDetail({
        id: res.data.id,
        name: res.data.name,
        description: res.data.description,
        price: res.data.price,
        quantity: res.data.quantity,
        img_url: res.data.imageUrl,
        reviews: res.data.reviews
      });
    });
  }, []);



  const [addedQuantity, setAddedQuantity] = useState(0);

  const increase = () => {
    setAddedQuantity((addedQuantity) => addedQuantity + 1);
  };

  const decrease = () => {
    setAddedQuantity((addedQuantity) => addedQuantity - 1);
  };

  if (!productDetail){
    return <>
    </>
  }

  console.log(productDetail)

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col-6">
              <img src={productDetail.img_url} className="w-100" />
            </div>
            <div className="col-6">
              <div className="d-flex">
                <button className="btn btn-link ps-0">
                  {productDetail.brand}
                </button>
                <span className="ms-auto my-auto me-2">
                  <Rating
                    initialRating={productDetail.rating}
                    readonly={true}
                    emptySymbol={<StarOutlined />}
                    fullSymbol={<StarFilled />}
                  />
                </span>
                <span className="my-auto">
                  <a href="#Reviews">({productDetail.reviews.length} reviews)</a>
                </span>
              </div>
              <h1>{productDetail.name}</h1>
              <hr />
              <h5>About this item</h5>
              <p dangerouslySetInnerHTML={{ __html: productDetail.about }} />
            </div>
          </div>
          <div className="row">
            <h4 className="mb-4">Reviews ({productDetail.reviews.length})</h4>
            {productDetail.reviews.map((review) => (
              <div id="Reviews">
                <div style={{ height: "150px" }}>
                  <ProductReview
                    author={review.author}
                    title={review.title}
                    content={review.content}
                    rating={review.rating}
                  />
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 col-3 bg-light-subtle">
          <h3>
            <b>${parseFloat(productDetail.price).toLocaleString()}</b>
          </h3>
          <div className="mb-3">
            <AddToCartButton
              quantity={addedQuantity}
              increase={increase}
              decrease={decrease}
            />
          </div>
          <Link
            to={"/cart"}
            className="btn btn-primary w-100 p-2"
            style={{ borderRadius: "9999px" }}
          >
            Checkout Now
          </Link>
        </div>
      </div>
    </div>
  );
}
