import { useState } from "react";
import AddToCartButton from "../AddToCartButton";
import ProductReview from "../ProductReviews";
import { Link } from "react-router-dom";

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
        rating: 0,
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
    <div className="container">
      <div className="row">
        <div className="col-9">
          <div className="row">
            <div className="col-6">
              <img src={productDetail.img_url} className="w-100" />
            </div>
            <div className="col-6">
              <button className="btn btn-link ps-0">
                {productDetail.brand}
              </button>
              <h1>{productDetail.name}</h1>
              <hr />
              <h5>About this item</h5>
              <p dangerouslySetInnerHTML={{ __html: productDetail.about }} />
            </div>
          </div>
          <div className="row">
            <h4 className="mb-4">Reviews ({productDetail.reviews.length})</h4>
            {productDetail.reviews.map((review) => (
              <div>
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
