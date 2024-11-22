import { CartContext } from "../../contexts/CartContextProvider";
import CartItems from "../CartItems";
import CartPreview from "../CartPreview";
import { useUserContext } from "../../contexts/UserContextProvider";
import { UserRole } from "../../constants/UserRole/index";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useContext } from "react";

export default function Cart(props) {
    const { userData } = useUserContext();
    const { cartItems } = useContext(CartContext);
    if (userData.role === UserRole.ADMIN || userData.role === UserRole.SELLER) {
        return (
            <Container
                fluid
                className="d-flex flex-column align-items-center justify-content-center vh-100 text-center"
            >
                <Row>
                    <Col>
                        <h1 className="display-3">Access Denied</h1>
                        <p className="lead">
                            You do not have permission to access this page.
                        </p>
                        <Button
                            variant="light"
                            size="lg"
                            onClick={() => (window.location.href = "/")}
                        >
                            Return to Home
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Your Cart</h2>
            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="bg-light p-3 rounded shadow-sm">
                        <CartItems cartItems={cartItems} />
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="bg-light p-3 rounded shadow-sm">
                        <CartPreview cartItems={cartItems} />
                    </div>
                </div>
            </div>
        </div>
    );
}
