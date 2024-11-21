import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRef } from "react";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export default function InventoryDetail(props) {
  const formRef = useRef();
  const nameValidationRef = useRef();
  const priceValidationRef = useRef();
  const stockValidationRef = useRef();
  const descriptionValidationRef = useRef();
  const imageUrlValidationRef = useRef();
  const navigate = useNavigate();

  const { name, price, stock, description, imageUrl } = props;

  console.log(imageUrl)

  const validate = () => {
    const name = formRef.current["name"].value;
    const price = parseFloat(formRef.current["price"].value);
    const stock = parseInt(formRef.current["stock"].value);
    const description = formRef.current["description"].value;
    const imageUrl = formRef.current["image-url"].value;

    var flag = true;
    if (_.isNull(name) || _.isUndefined(name) || name.length === 0) {
      nameValidationRef.current.hidden = false;
      flag = false;
    }
    if (_.isNull(price) || _.isNaN(price) || !_.isNumber(price)) {
      priceValidationRef.current.hidden = false;
      flag = false;
    }
    if (_.isNull(stock) || _.isNaN(stock) || !_.isNumber(stock)) {
      stockValidationRef.current.hidden = false;
      flag = false;
    }
    if (
      _.isNull(description) ||
      _.isUndefined(description) ||
      description.length === 0
    ) {
      descriptionValidationRef.current.hidden = false;
      flag = false;
    }
    if (
      _.isNull(imageUrl) ||
      _.isUndefined(imageUrl) ||
      imageUrl.length === 0
    ) {
      imageUrlValidationRef.current.hidden = false;
      flag = false;
    }
    return flag;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    nameValidationRef.current.hidden = true;
    priceValidationRef.current.hidden = true;
    stockValidationRef.current.hidden = true;
    descriptionValidationRef.current.hidden = true;
    imageUrlValidationRef.current.hidden = true;
    if (!validate()) {
      return;
    }
  };
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <div class="mb-3">
        <label for="name" class="form-label">
          Product name
        </label>
        <input type="text" class="form-control" id="name" defaultValue={name} />
        <small className="text-danger" ref={nameValidationRef} hidden>
          <ExclamationCircleOutlined /> Invalid name
        </small>
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">
          Price
        </label>
        <input
          type="text"
          class="form-control"
          id="price"
          defaultValue={price}
        />
        <small className="text-danger" ref={priceValidationRef} hidden>
          <ExclamationCircleOutlined /> Invalid price
        </small>
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">
          Stock
        </label>
        <input
          type="text"
          class="form-control"
          id="stock"
          defaultValue={stock}
        />
        <small className="text-danger" ref={stockValidationRef} hidden>
          <ExclamationCircleOutlined /> Invalid stock
        </small>
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">
          Description
        </label>
        <textarea
          class="form-control"
          id="description"
          defaultValue={description}
        ></textarea>
        <small className="text-danger" ref={descriptionValidationRef} hidden>
          <ExclamationCircleOutlined /> Invalid description
        </small>
      </div>
      <div class="mb-3">
        <label for="image-url" class="form-label">
          Product Image
        </label>
        <input
          type="text"
          class="form-control"
          id="image-url"
          defaultValue={imageUrl}
        />
        <small className="text-danger" ref={imageUrlValidationRef} hidden>
          <ExclamationCircleOutlined /> Invalid image url
        </small>
      </div>
      <div className="d-flex">
        <div className="mx-auto">
          <button
            className="btn btn-warning me-2"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
