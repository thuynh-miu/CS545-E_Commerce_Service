import { useMemo, useState, useEffect } from "react";
import AddToCartButton from "../AddToCartButton";
import ProductReview from "../ProductReviews";
import {Link, useParams} from "react-router-dom";
import Rating from "react-rating";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContextProvider";

export default function ProductDetailPage(props) {
  const { cartItems, addProduct, removeProduct } = useUserContext();
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

  const product = useMemo(() => {
    return cartItems.find(item => item.id == productId);
  }, [cartItems, productId]);


  const increase = () => {
    addProduct(productDetail);
  };

  const decrease = () => {
    removeProduct(productDetail)
  };

  if (!productDetail){
    return <>
    </>
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        {/* Product Image and Details */}
        <div className="col-12 col-lg-9">
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <img src={productDetail.img_url} alt={productDetail.name} className="img-fluid rounded" />
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex align-items-center mb-3">
                <button className="btn btn-link p-0 text-primary">{productDetail.brand}</button>
                <span className="ms-auto d-flex align-items-center">
                  <Rating
                    initialRating={productDetail.rating}
                    readonly={true}
                    emptySymbol={<StarOutlined />}
                    fullSymbol={<StarFilled />}
                    className="me-2"
                  />
                  <a href="#Reviews" className="text-decoration-none">({productDetail.reviews.length} reviews)</a>
                </span>
              </div>
              <h1 className="h4 fw-bold">{productDetail.name}</h1>
              <hr />
              <h5>About this item</h5>
              <div dangerouslySetInnerHTML={{ __html: productDetail.about }} className="small" />
            </div>
          </div>
          <div className="row">
            <h4 className="mb-4">Reviews ({productDetail.reviews.length})</h4>
            {productDetail.reviews.map((review) => (
              <div key={review.id}>
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
            <AddToCartButton quantity={(product && product.quantity) || 0} increase={increase} decrease={decrease} />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="col-12">
          <h4 className="mb-4">Reviews ({productDetail.reviews.length})</h4>
          {productDetail.reviews.map((review, index) => (
            <div key={index} id="Reviews" className="mb-4">
              <ProductReview
                author={review.author}
                title={review.title}
                content={review.content}
                rating={review.rating}
              />
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
