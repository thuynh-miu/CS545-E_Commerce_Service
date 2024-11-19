
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { InputGroup } from 'react-bootstrap';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function NavBar(props) {

    const inputRef = useRef();
    const navigate = useNavigate();
    const handleSubmitForm = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            q: inputRef.current.value,
            page: 1
        })
        navigate(`/products/search?q=${queryParams.toString()}`)
    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary px-5">
            {/* <Container> */}
            <Link className='navbar-brand' to={'/'}>A & C</Link>
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
            {/* <Navbar.Collapse id="responsive-navbar-nav"> */}
            <Form className="d-flex ms-auto me-auto w-50" onSubmit={handleSubmitForm}>
                <InputGroup>

                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        ref={inputRef}
                    />
                    <Button type='submit' variant="outline-success">
                        <SearchOutlined />
                    </Button>

                </InputGroup>
            </Form>

            {/* <Nav> */}
                <Link className='nav-link me-2' to={'/login'}>
                    Login <UserOutlined />
                </Link>
                <Link className='nav-link' to={'/cart'}>
                    <ShoppingCartOutlined />
                </Link>
            {/* </Nav> */}
            {/* </Navbar.Collapse> */}
            {/* </Container> */}
        </Navbar>
    )
}