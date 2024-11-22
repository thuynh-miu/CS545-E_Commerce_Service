import { useRef } from "react";
import Collapsible from "../Collapsible";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function Checkout() {
  const fullNameInputRef = useRef();
  const fullNameValidationRef = useRef();

  const phoneInputRef = useRef();
  const phoneValidationRef = useRef();

  const emailInputRef = useRef();
  const emailValidationRef = useRef();

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

    return isValid;
  };

  const submit = () => {
    if (!validateForm()) {
      return;
    }
    alert("Payment submitted successfully!");
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
              <small className="text-danger" ref={fullNameValidationRef} hidden>
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
              />
              <small className="text-danger" ref={phoneValidationRef} hidden>
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
                required
              />
              <small className="text-danger" ref={emailValidationRef} hidden>
                <ExclamationCircleOutlined /> Invalid email
              </small>
            </div>
          </div>
        </Collapsible>
      </div>

      <div className="mb-4">
        <Collapsible id="shipping-address" title={<h2 className="h5">Shipping Address</h2>}>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="street" className="form-label">
                Street
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                required
              />
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
              />
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
              />
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
              />
            </div>
          </div>
        </Collapsible>
      </div>

      <div className="mb-4">
        <Collapsible id="payment-method" title={<h2 className="h5">Payment Method</h2>}>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label htmlFor="card-number" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                id="card-number"
                required
              />
            </div>
            <div className="col-6 col-md-3">
              <label htmlFor="expiration-date" className="form-label">
                Expiration Date
              </label>
              <input
                type="month"
                className="form-control"
                id="expiration-date"
                required
              />
            </div>
            <div className="col-6 col-md-3">
              <label htmlFor="ccv" className="form-label">
                CCV
              </label>
              <input
                type="text"
                className="form-control"
                id="ccv"
                required
              />
            </div>
          </div>
        </Collapsible>
      </div>

      <div className="text-center">
        <button className="btn btn-primary w-100 py-2 rounded-pill" onClick={submit}>
          Pay Now
        </button>
      </div>
    </div>
  );
}
