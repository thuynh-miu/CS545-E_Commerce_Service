import { useMemo, useState, useEffect, useContext } from "react";
import AddToCartButton from "../AddToCartButton";
import ProductReview from "../ProductReviews";
import {Link, useParams} from "react-router-dom";
import Rating from "react-rating";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import axios from "axios";
import { useUserContext } from "../../contexts/UserContextProvider";
import { getReviewsByProductId, getProductById } from "../../api";
import { deleteReview } from "../../api/products";
import { CartContext } from "../../contexts/CartContextProvider";

export default function ProductDetailPage(props) {
  const { cartItems, addProduct, reduceProduct } = useContext(CartContext);
  const [productDetail, setProductDetail] = useState(null);
  const [reviews, setReviews] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    getProductById(productId).then((res) => {
      setProductDetail({
        id: res.id,
        name: res.name,
        description: res.description,
        price: res.price,
        quantity: res.quantity,
        img_url: res.imageUrl
      });
    });
    getReviewsByProductId(productId).then((res) => {
      setReviews(res.map(review => {
        return {
          id: review.id,
          title: review.title,
          comment: review.comment,
          rating: review.rating,
          buyer: review.buyer
        };
      }));
    });
  }, []);

  const product = useMemo(() => {
    return cartItems?.find(item => item.id == productId);
  }, [cartItems, productId]);


  const increase = () => {
    addProduct(productDetail);
  };

  const decrease = () => {
    reduceProduct(productDetail)
  };

  const deleteReviewHandler = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error(error);
    }
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
                  <a href="#Reviews" className="text-decoration-none">({reviews?.length} reviews)</a>
                </span>
              </div>
              <h1 className="h4 fw-bold">{productDetail.name}</h1>
              <hr />
              <h5>About this item</h5>
              <div dangerouslySetInnerHTML={{ __html: productDetail.description }} className="small" />
            </div>
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
          <h4 className="mb-4">Reviews ({reviews?.length})</h4>
          {reviews?.map((review, index) => (
            <div key={index} id="Reviews" className="mb-4">
              <ProductReview
                author={review.author || "Anonymous"}
                title={review.title}
                content={review.comment}
                rating={review.rating}
                onDelete={() => deleteReviewHandler(review.id)}
              />
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
