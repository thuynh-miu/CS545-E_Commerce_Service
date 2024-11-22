import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export default function InventoryDetail(props) {
  const formRef = useRef();
  const nameValidationRef = useRef();
  const priceValidationRef = useRef();
  const quantityValidationRef = useRef();
  const descriptionValidationRef = useRef();
  const imageUrlValidationRef = useRef();
  const navigate = useNavigate();

  const { name, price, quantity, description, imageUrl } = props;

  const validate = () => {
    const name = formRef.current["name"].value;
    const price = parseFloat(formRef.current["price"].value);
    const quantity = parseInt(formRef.current["quantity"].value);
    const description = formRef.current["description"].value;
    const imageUrl = formRef.current["image-url"].value;

    let isValid = true;
    if (_.isEmpty(name)) {
      nameValidationRef.current.hidden = false;
      isValid = false;
    }
    if (_.isNaN(price) || price <= 0) {
      priceValidationRef.current.hidden = false;
      isValid = false;
    }
    if (_.isNaN(quantity) || quantity < 0) {
      quantityValidationRef.current.hidden = false;
      isValid = false;
    }
    if (_.isEmpty(description)) {
      descriptionValidationRef.current.hidden = false;
      isValid = false;
    }
    if (_.isEmpty(imageUrl)) {
      imageUrlValidationRef.current.hidden = false;
      isValid = false;
    }
    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    nameValidationRef.current.hidden = true;
    priceValidationRef.current.hidden = true;
    quantityValidationRef.current.hidden = true;
    descriptionValidationRef.current.hidden = true;
    imageUrlValidationRef.current.hidden = true;

    if (validate()) {
      const newInventory = {
        name: formRef.current["name"].value,
        price: parseFloat(formRef.current["price"].value),
        quantity: parseInt(formRef.current["quantity"].value),
        description: formRef.current["description"].value,
        imageUrl: formRef.current["image-url"].value,
      };
      props.onSave(newInventory);
    }
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="bg-light p-4 rounded shadow-sm">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          defaultValue={name}
          placeholder="Enter product name"
        />
        <small className="text-danger" ref={nameValidationRef} hidden>
          <ExclamationCircleOutlined /> Please enter a valid product name
        </small>
      </div>

      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          defaultValue={price}
          placeholder="Enter product price"
        />
        <small className="text-danger" ref={priceValidationRef} hidden>
          <ExclamationCircleOutlined /> Please enter a valid price
        </small>
      </div>

      <div className="mb-3">
        <label htmlFor="quantity" className="form-label">
          Quantity
        </label>
        <input
          type="number"
          className="form-control"
          id="quantity"
          defaultValue={quantity}
          placeholder="Enter quantity quantity"
        />
        <small className="text-danger" ref={quantityValidationRef} hidden>
          <ExclamationCircleOutlined /> Please enter a valid quantity quantity
        </small>
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          defaultValue={description}
          placeholder="Enter product description"
        ></textarea>
        <small className="text-danger" ref={descriptionValidationRef} hidden>
          <ExclamationCircleOutlined /> Please provide a description
        </small>
      </div>

      <div className="mb-3">
        <label htmlFor="image-url" className="form-label">
          Product Image URL
        </label>
        <input
          type="text"
          className="form-control"
          id="image-url"
          defaultValue={imageUrl}
          placeholder="Enter image URL"
        />
        <small className="text-danger" ref={imageUrlValidationRef} hidden>
          <ExclamationCircleOutlined /> Please provide a valid image URL
        </small>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          type="button"
          className="btn btn-secondary me-3"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}
