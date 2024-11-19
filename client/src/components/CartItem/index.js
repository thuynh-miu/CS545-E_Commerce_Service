import { MinusOutlined, PlusOutlined } from "@ant-design/icons";


export default function CartItem({item}) {
    const {img_url, name, price, quantity, id} = item;
    return (
        <div>
            <div className="d-flex w-100">
                <div>
                    <img src={img_url} height={96} width={96} />
                </div>
                <div className="d-flex w-100">
                    <p>{name}</p>
                    <p className="ms-auto"><b>${parseFloat(price).toFixed(2)}</b></p>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-link">Remove</button>
                <div className="d-flex quantity-selector">
                    <MinusOutlined className="decrease-quantity-button" />
                    <div className="m-auto">{quantity}</div>
                    <PlusOutlined className="increase-quantity-button" />
                </div>
            </div>
        </div>
    )
}