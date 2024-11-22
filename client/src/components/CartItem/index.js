import { useContext, useMemo } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import AddToCartButton from "../AddToCartButton";
import { CartContext } from "../../contexts/CartContextProvider";

export default function CartItem({ item }) {
    const {imageUrl, name, price, quantity, id} = item;
    const { cartItems, addProduct, reduceProduct, removeProduct } = useContext(CartContext);

    const productInfo = useMemo(() => {
        return cartItems.find(item => item.id == id);
      }, [cartItems, id]);

    const increase = () => {
        addProduct(item);
    };
    const decrease = () => {
        reduceProduct(item);
    };
    const remove = () => {
        removeProduct(item);
    }

    return (
        <div>
            <div className="d-flex w-100">
                <div>
                    <img src={imageUrl} height={96} width={96} />
                </div>
                <div className="d-flex w-100 ps-3">
                    <p>{name}</p>
                    <p className="ms-auto"><b>${parseFloat(price).toFixed(2)}</b></p>
                </div>
            </div>
            <div className="d-flex justify-content-end">
                <button className="btn btn-link" onClick={remove}>Remove</button>
                <div className="d-flex quantity-selector">
                    <MinusOutlined className="decrease-quantity-button" onClick={decrease} />
                    <div className="m-auto">{(productInfo && productInfo.quantity) || 0}</div>
                    <PlusOutlined className="increase-quantity-button" onClick={increase} />
                </div>
            </div>
        </div>
    )
}