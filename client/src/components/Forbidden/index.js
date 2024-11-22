import { Container, Row, Col, Button } from "react-bootstrap";

export default function Forbidden() {
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
