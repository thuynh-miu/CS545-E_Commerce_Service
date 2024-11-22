import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, Button, InputGroup } from 'react-bootstrap';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

export default function NavBar() {
    const searchInputRef = useRef();
    const navigate = useNavigate();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const queryParams = new URLSearchParams({
            q: searchInputRef.current.value,
            page: 1,
        });
        navigate(`/products/search?${queryParams.toString()}`);
    };

    return (
        <Navbar collapseOnSelect bg="primary" expand="lg" className="px-3" data-bs-theme="light">
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                <img src="/logo.png" alt="Logo" height="40" />
            </Navbar.Brand>
            {/* Toggle Button */}
            <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                className="border-0 custom-toggler"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto me-auto w-100 justify-content-between">
                    <Form className="d-flex w-100 me-lg-5 mb-2 mb-lg-0" onSubmit={handleSearchSubmit}>
                        <InputGroup size="sm">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                ref={searchInputRef}
                                className="form-control-sm"
                            />
                            <Button type="submit" variant="outline-success" className="btn-sm">
                                <SearchOutlined />
                            </Button>
                        </InputGroup>
                    </Form>
                    <div className="d-flex align-items-center gap-3">
                        <Nav.Link as={Link} to="/login" className="d-flex align-items-center text-white">
                            <UserOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                            <span className="d-none d-md-inline">Login</span>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart" className="d-flex align-items-center text-white">
                            <ShoppingCartOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
                            <span className="d-none d-md-inline">Cart</span>
                        </Nav.Link>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
