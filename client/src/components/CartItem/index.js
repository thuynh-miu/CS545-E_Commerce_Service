import { useMemo } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useUserContext } from '../../contexts/UserContextProvider';
import AddToCartButton from "../AddToCartButton";

export default function CartItem({ item }) {
    const {img_url, name, price, quantity, id} = item;
    const { cartItems, addProduct, removeProduct } = useUserContext();

    const productInfo = useMemo(() => {
        return cartItems.find(item => item.id == id);
      }, [cartItems, id]);

    const increase = () => {
        addProduct(item);
    };
    const decrease = () => {
        removeProduct(item);
    };

    return (
        <div>
            <div className="d-flex w-100">
                <div>
                    <img src={img_url} height={96} width={96} />
                </div>
                <div className="d-flex w-100 ps-3">
                    <p>{name}</p>
                    <p className="ms-auto"><b>${parseFloat(price).toFixed(2)}</b></p>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-link">Remove</button>
                <div className="d-flex quantity-selector">
                    <MinusOutlined className="decrease-quantity-button" onClick={decrease} />
                    <div className="m-auto">{(productInfo && productInfo.quantity) || 0}</div>
                    <PlusOutlined className="increase-quantity-button" onClick={increase} />
                </div>
            </div>
        </div>
    )
}