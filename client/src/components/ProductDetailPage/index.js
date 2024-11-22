import { useState } from "react";
import AddToCartButton from "../AddToCartButton";
import ProductReview from "../ProductReviews";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { StarFilled, StarOutlined } from "@ant-design/icons";

export default function ProductDetailPage(props) {
  const [productDetail, setProductDetail] = useState({
    name: "Apple iPhone 15 Pro 128GB Black Titanium",
    brand: "Apple",
    rating: "4.3",
    price: 1049.0,
    stock_left: 10,
    img_url:
      "https://i5.walmartimages.com/seo/Apple-iPhone-15-Pro-128GB-Black-Titanium_9f6f8b16-d4ea-4ecc-86f8-114386e6381e.88e5b55ab4cd0b6325266a880c055f64.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    stock: 10,
    reviews: [
      {
        author: "Cuong",
        title: "It sucks!",
        content: "Samsung makes better phones",
        rating: 0,
      },
      {
        author: "Ronaldo",
        title: "I love it!",
        content: "This is my 1000-th phone",
        rating: 5,
      },
    ],
    about: `<ul>   <li>FORGED IN TITANIUM - iPhone 15 Pro has a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that's tougher than any smartphone glass. And it's splash, water, and dust resistant.</li>   <li>ADVANCED DISPLAY - The 6.1" Super Retina XDR display with ProMotion ramps up refresh rates to 120Hz when you need exceptional graphics performance. Dynamic Island bubbles up alerts and Live Activities. Plus, with Always-On display, your Lock Screen stays glanceable, so you don't have to tap it to stay in the know.</li> </ul>`,
  });

  const [addedQuantity, setAddedQuantity] = useState(0);

  const increase = () => {
    setAddedQuantity((addedQuantity) => addedQuantity + 1);
  };

  const decrease = () => {
    setAddedQuantity((addedQuantity) => addedQuantity - 1);
  };

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
        </div>

        {/* Price and Add to Cart */}
        <div className="col-12 col-lg-3">
          <div className="bg-light p-4 rounded shadow-sm">
            <h3 className="fw-bold">${parseFloat(productDetail.price).toLocaleString()}</h3>
            <p className="text-muted small mb-3">Stock Left: {productDetail.stock_left}</p>
            <div className="mb-3">
              <AddToCartButton quantity={addedQuantity} increase={increase} decrease={decrease} />
            </div>
            <Link to="/cart" className="btn btn-primary w-100 py-2 rounded-pill">
              Checkout Now
            </Link>
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
