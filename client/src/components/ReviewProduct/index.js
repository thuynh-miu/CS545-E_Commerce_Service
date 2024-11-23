import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Rating from "react-rating";
import { useNavigate, useParams } from "react-router-dom";
import { createReview } from "../../api/products";
import {
    Alert,
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    Row,
} from "react-bootstrap";
import { getProductById } from "../../api";

export default function ReviewProduct() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ type: "", message: "" });

    const titleRef = useRef();
    const commentRef = useRef();

    const initProduct = {
        id: 1,
        brand: "Mainstays",
        name: "Mainstays 2.2 Qt - Compact Air Fryer, Black - Automatic Shutoff, Built-in Timer",
        imageUrl:
            "https://i5.walmartimages.com/seo/Mainstays-2-2-Qt-Compact-Air-Fryer-Non-Stick-Dishwasher-Safe-Basket-1150W-Black-Automatic-Shutoff-Built-in-Timer-New-Condition_1f151723-56df-47cb-bea4-cd24bc216d07.0155bba2f419511d81441e32814f8fd1.jpeg",
    };

    const [product, setProduct] = useState(initProduct);

    useEffect(() => {
        getProductById(productId).then((data) => {
            setProduct(data);
        });
    }, []);

    const onCancel = () => {
        navigate(-1);
    };

    const onSubmitReview = async () => {
        const title = titleRef.current.value;
        const comment = commentRef.current.value;

        if (!title || !comment) {
            setAlert({
                type: "danger",
                message: "Title and comment are required!",
            });
            return;
        }

        setLoading(true);
        setAlert({ type: "", message: "" });

        try {
            await createReview(product.id, {
                rating,
                title,
                comment,
            });

            setAlert({
                type: "success",
                message: "Your review has been submitted!",
            });
            setTimeout(() => navigate(-1), 2000); // Navigate back after 2 seconds
        } catch (error) {
            console.error(error);
            setAlert({
                type: "danger",
                message: "Failed to submit the review. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            {alert.message && (
                <Alert variant={alert.type} className="text-center">
                    {alert.message}
                </Alert>
            )}

            <Card className="shadow-lg p-3 rounded">
                <Card.Body>
                    <Row className="mb-3">
                        <Col xs={4}>
                            <Image src={product.imageUrl} fluid rounded />
                        </Col>
                        <Col xs={8}>
                            <h5>{product.brand}</h5>
                            <p>
                                <strong>{product.name}</strong>
                            </p>
                        </Col>
                    </Row>

                    <Form>
                        <Form.Group className="mb-3 text-center">
                            <Form.Label>Overall Rating</Form.Label>
                            <div>
                                <Rating
                                    initialRating={rating}
                                    onChange={(rate) => setRating(rate)}
                                    emptySymbol={
                                        <StarOutlined
                                            style={{
                                                fontSize: "24px",
                                                color: "#ffc107",
                                            }}
                                        />
                                    }
                                    fullSymbol={
                                        <StarFilled
                                            style={{
                                                fontSize: "24px",
                                                color: "#ffc107",
                                            }}
                                        />
                                    }
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                ref={titleRef}
                                type="text"
                                placeholder="Write a title for your review"
                                disabled={loading}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Your Review</Form.Label>
                            <Form.Control
                                ref={commentRef}
                                as="textarea"
                                rows={4}
                                placeholder="Share your thoughts about the product..."
                                disabled={loading}
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Button
                                variant="secondary"
                                onClick={onCancel}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                onClick={onSubmitReview}
                                disabled={loading}
                            >
                                {loading ? "Submitting..." : "Submit Review"}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
