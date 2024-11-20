import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


export default function Product({ product }) {

    const { name, price, rating, img_url } = product;

    return (
        <div className="card">
            <Link to={`/products/detail/${product.id}`} className="text-decoration-none">
                <img className="card-img-top" src={img_url} />
                <div className="card-body">
                    <h5 className="card-title">${parseFloat(price).toFixed(2)}</h5>
                    <p className="card-text">
                        <div>{name}</div>
                        <div>{rating}</div>
                    </p>
                </div>
            </Link>
            <div className="card-body pt-0">
                <div className="d-flex">
                    <button className="card-text btn btn-primary ms-auto">
                        <PlusOutlined className="me-1" />Add
                    </button>
                </div>
            </div>
        </div >
    )
}