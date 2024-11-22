import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useRef } from "react";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";

export default function ReviewProduct(props) {
    const navigate = useNavigate();

    const ratingRef = useRef();
    const commentRef = useRef();

    const product = {
        id: 1,
        brand: "Mainstays",
        name: "Mainstays 2.2 Qt -Compact Air Fryer, Black - Automatic Shutoff, Built-in Timer",
        imageUrl:
            "https://i5.walmartimages.com/seo/Mainstays-2-2-Qt-Compact-Air-Fryer-Non-Stick-Dishwasher-Safe-Basket-1150W-Black-Automatic-Shutoff-Built-in-Timer-New-Condition_1f151723-56df-47cb-bea4-cd24bc216d07.0155bba2f419511d81441e32814f8fd1.jpeg",
    };

    const onCancel = () => {
        navigate(-1);
    };

    const onSubmitReview = () => {
        console.log(ratingRef.current.state.value);
        console.log(commentRef.current.value);
    };

    return (
        <div className="container w-50">
            <div className="d-flex mb-3">
                <h1>Write an item review</h1>
                <button className="btn btn-link ms-auto" onClick={onCancel}>
                    Cancel
                </button>
            </div>
            <div className="d-flex mb-3">
                <div>
                    <img src={product.imageUrl} width={100} height={100} />
                </div>
                <div>
                    <div>
                        <span>{product.brand}</span>
                    </div>
                    <div>
                        <span>
                            <b>{product.name}</b>
                        </span>
                    </div>
                </div>
            </div>
            <div className="container">
                <h4>What do you think of it overall?</h4>
                <h5>Like it or not, tell us everything.</h5>
                <div className="py-5">
                    <div className="d-flex">
                        <div className="mx-auto">
                            <span>Overall rating</span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="mx-auto">
                            <h1>
                                <Rating
                                    initialRating={5}
                                    ref={ratingRef}
                                    emptySymbol={<StarOutlined />}
                                    fullSymbol={<StarFilled />}
                                />
                            </h1>
                        </div>
                    </div>
                </div>
                <h5>What do you want others to know?</h5>
                <div className="form-group py-2">
                    <label htmlFor="review-textarea">Your review</label>
                    <textarea
                        ref={commentRef}
                        class="form-control"
                        id="review-textarea"
                        rows="5"
                        placeholder="Share what you liked or disliked, how you use the product, fun facts, etc..."
                    ></textarea>
                </div>
                <div className="d-flex">
                    <button
                        className="btn btn-primary mx-auto"
                        onClick={onSubmitReview}
                    >
                        Submit your review!
                    </button>
                </div>
            </div>
        </div>
    );
}
