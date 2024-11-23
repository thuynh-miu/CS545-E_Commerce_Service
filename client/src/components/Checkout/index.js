import { useContext, useRef } from "react";
import Collapsible from "../Collapsible";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { placeOrder } from "../../api/cart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/CartContextProvider";
import { useUserContext } from "../../contexts/UserContextProvider";

export default function Checkout() {
    const navigate = useNavigate();
    const {userData} = useUserContext();
    const { cartItems, syncCart } = useContext(CartContext);
    const fullNameInputRef = useRef();
    const fullNameValidationRef = useRef();

    const phoneInputRef = useRef();
    const phoneValidationRef = useRef();

    const emailInputRef = useRef();
    const emailValidationRef = useRef();

    const streetInputRef = useRef();
    const streetValidationRef = useRef();

    const cityInputRef = useRef();
    const cityValidationRef = useRef();

    const stateInputRef = useRef();
    const stateValidationRef = useRef();

    const zipCodeInputRef = useRef();
    const zipCodeValidationRef = useRef();

    const cardNumberInputRef = useRef();
    const cardNumberValidationRef = useRef();

    const expiryInputRef = useRef();
    const expiryValidationRef = useRef();

    const cvvInputRef = useRef();
    const cvvValidationRef = useRef();

    const validatePhone = (phone) => phone && phone.length === 10;

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validateForm = () => {
        var isValid = true;

        fullNameValidationRef.current.hidden = true;
        if (!fullNameInputRef.current.value) {
            fullNameValidationRef.current.hidden = false;
            isValid = false;
        }

        phoneValidationRef.current.hidden = true;
        if (!validatePhone(phoneInputRef.current.value)) {
            phoneValidationRef.current.hidden = false;
            isValid = false;
        }

        emailValidationRef.current.hidden = true;
        if (!validateEmail(emailInputRef.current.value)) {
            emailValidationRef.current.hidden = false;
            isValid = false;
        }

        streetValidationRef.current.hidden = true;
        if (!streetInputRef.current.value) {
            streetValidationRef.current.hidden = false;
            isValid = false;
        }

        cityValidationRef.current.hidden = true;
        if (!cityInputRef.current.value) {
            cityValidationRef.current.hidden = false;
            isValid = false;
        }

        stateValidationRef.current.hidden = true;
        if (!stateInputRef.current.value) {
            stateValidationRef.current.hidden = false;
            isValid = false;
        }

        zipCodeValidationRef.current.hidden = true;
        if (!zipCodeInputRef.current.value) {
            zipCodeValidationRef.current.hidden = false;
            isValid = false;
        }

        cardNumberValidationRef.current.hidden = true;
        if (!cardNumberInputRef.current.value) {
            cardNumberValidationRef.current.hidden = false;
            isValid = false;
        }

        expiryValidationRef.current.hidden = true;
        if (!expiryInputRef.current.value) {
            expiryValidationRef.current.hidden = false;
            isValid = false;
        }

        cvvValidationRef.current.hidden = true;
        if (!cvvInputRef.current.value) {
            cvvValidationRef.current.hidden = false;
            isValid = false;
        }

        return isValid;
    };

    const submit = () => {
        if (!validateForm()) {
            return;
        }

        const fullname = fullNameInputRef.current.value;
        const phone = phoneInputRef.current.value;
        const email = emailInputRef.current.value;
        const street = streetInputRef.current.value;
        const city = cityInputRef.current.value;
        const state = stateInputRef.current.value;
        const zipCode = zipCodeInputRef.current.value;
        const cardNumber = cardNumberInputRef.current.value;
        const expiryDate = expiryInputRef.current.value;
        const cvv = cvvInputRef.current.value;

        placeOrder({
            address: {
                street: street,
                state: state,
                city: city,
                zipCode: zipCode,
            },
            payment: {
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
            },
            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            })),
        })
            .then((response) => {
                if (response.status > 299) {
                    throw new Error("Can not place order");
                }
                syncCart();
                navigate("/buyer/orders");
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div className="container py-4">
            <div className="mb-4">
                <Collapsible
                    id="contact-information"
                    title={<h2 className="h5">Contact Information</h2>}
                >
                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="full-name" className="form-label">
                                Full Name
                            </label>
                            <input
                                ref={fullNameInputRef}
                                type="text"
                                className="form-control"
                                id="full-name"
                                required
                            />
                            <small
                                className="text-danger"
                                ref={fullNameValidationRef}
                                hidden
                            >
                                <ExclamationCircleOutlined /> Invalid name
                            </small>
                        </div>
                        <div className="col-12">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                ref={phoneInputRef}
                                type="text"
                                className="form-control"
                                id="phone"
                                required
                                maxLength={10}
                            />
                            <small
                                className="text-danger"
                                ref={phoneValidationRef}
                                hidden
                            >
                                <ExclamationCircleOutlined /> Invalid phone
                            </small>
                        </div>
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                ref={emailInputRef}
                                type="email"
                                className="form-control"
                                id="email"
                                defaultValue={userData?.email || ""}
                                required
                            />
                            <small
                                className="text-danger"
                                ref={emailValidationRef}
                                hidden
                            >
                                <ExclamationCircleOutlined /> Invalid email
                            </small>
                        </div>
                    </div>
                </Collapsible>
            </div>

            <div className="mb-4">
                <Collapsible
                    id="shipping-address"
                    title={<h2 className="h5">Shipping Address</h2>}
                >
                    <div className="row g-3">
                        <div className="col-12">
                            <label htmlFor="street" className="form-label">
                                Street
                            </label>
                            <input
                                ref={streetInputRef}
                                type="text"
                                className="form-control"
                                id="street"
                                required
                            />
                            <small
                                className="text-danger"
                                ref={streetValidationRef}
                                hidden
                            >
                                <ExclamationCircleOutlined /> Invalid street
                            </small>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="city" className="form-label">
                                City
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                required
                                ref={cityInputRef}
                            />
                            <small
                                className="text-danger"
                                ref={cityValidationRef}
                                hidden
                            >
                                <ExclamationCircleOutlined /> Invalid city
                            </small>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="state" className="form-label">
                                State
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="state"
                                required
                                ref={stateInputRef}
                            />
                            <small
                                className="text-danger"
                                ref={stateValidationRef}
                                hidden
                            >
                                <ExclamationCircleOutlined /> Invalid state
                            </small>
                        </div>
                        <div className="col-6 col-md-4">
                            <label htmlFor="zipcode" className="form-label">
                                Zipcode
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="zipcode"
                                required
                                ref={zipCodeInputRef}
                            />
                            <small
                                className="text-danger"
                                ref={zipCodeValidationRef}
                                hidden
                            >
                                <ExclamationCircleOutlined /> Invalid zipcode
                            </small>
                        </div>
                    </div>
                </Collapsible>
            </div>

            <div className="mb-4">
                <Collapsible
                    id="payment-method"
                    title={<h2 className="h5">Payment Method</h2>}
                >
                    <div className="row g-3">
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="card-number" className="form-label">
                                Card Number
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="card-number"
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                required
                                ref={cardNumberInputRef}
                                onInput={(e) => {
                                    e.target.value = e.target.value
                                    .replace(/\D/g, '')
                                    .replace(/(.{4})/g, '$1 ')
                                    .trim();
                                }}
                                />
                                <small className="text-danger" ref={cardNumberValidationRef} hidden>
                                <ExclamationCircleOutlined /> Invalid card number
                                </small>
                            </div>

                            <div className="col-6 col-md-3">
                                <label htmlFor="expiry-date" className="form-label">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="expiry-date"
                                    placeholder="MM/YYYY"
                                    maxLength={7}
                                    required
                                    ref={expiryInputRef}
                                    onInput={(e) => {
                                    e.target.value = e.target.value
                                        .replace(/\D/g, '')
                                        .replace(/(\d{2})(\d{0,4})/, (match, p1, p2) => (p2 ? `${p1}/${p2}` : p1))
                                        .slice(0, 7);
                                    }}
                                />
                                <small className="text-danger" ref={expiryValidationRef} hidden>
                                    <ExclamationCircleOutlined /> Invalid expiry date
                                </small>
                            </div>

                            <div className="col-6 col-md-3">
                                <label htmlFor="cvv" className="form-label">
                                CVV
                                </label>
                                <input
                                type="text"
                                className="form-control"
                                id="cvv"
                                placeholder="123"
                                maxLength={3}
                                required
                                ref={cvvInputRef}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\D/g, '');
                                }}
                                />
                                <small className="text-danger" ref={cvvValidationRef} hidden>
                                <ExclamationCircleOutlined /> Invalid CVV
                                </small>
                            </div>
                            </div>
                    </div>
                </Collapsible>
            </div>

            <div className="text-center">
                <button
                    className="btn btn-primary w-100 py-2 rounded-pill"
                    onClick={submit}
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}
