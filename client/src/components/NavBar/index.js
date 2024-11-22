import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import {
    DownOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import _ from "lodash";

export default function NavBar(props) {
    const inputRef = useRef();
    const navigate = useNavigate();
    const handleSubmitForm = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            q: inputRef.current.value,
            page: 1,
        });
        navigate(`/products/search?${queryParams.toString()}`);
    };

    const { userData, userDispatch } = useContext(UserContext);
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary px-5">
            <Link className="navbar-brand" to={"/"}>
                A & C
            </Link>
            <Form
                className="d-flex ms-auto me-auto w-50"
                onSubmit={handleSubmitForm}
            >
                <InputGroup>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        ref={inputRef}
                    />
                    <Button type="submit" variant="outline-success">
                        <SearchOutlined />
                    </Button>
                </InputGroup>
            </Form>
            {_.isNull(userData) || _.isEmpty(userData) ? (
                <div>
                    <Link className="nav-link me-2" to={"/login"}>
                        Login <UserOutlined />
                    </Link>
                </div>
            ) : (
                <div className="d-flex">
                    <DropdownButton
                        className="me-2"
                        title={
                            <span className="me">
                                <span className="me-2">
                                    {userData.username}
                                </span>
                                <UserOutlined />
                            </span>
                        }
                    >
                        <Dropdown.Item>
                            <Link className="text-decoration-none" to={"/logout"}>Log out</Link>
                        </Dropdown.Item>
                    </DropdownButton>

                    <div className="my-auto">
                        <Link className="nav-link" to={"/cart"}>
                            <ShoppingCartOutlined />
                        </Link>
                    </div>
                </div>
            )}
        </Navbar>
    );
}
