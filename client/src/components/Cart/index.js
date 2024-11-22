import CartItems from "../CartItems"
import CartPreview from "../CartPreview"
import { useUserContext } from '../../contexts/UserContextProvider';

export default function Cart(props) {
    const { cartItems } = useUserContext();

    return (
        <div className="container-lg">
            <h2 className="mb-5">Cart</h2>
            <div className="d-flex">
                <div className="cart-detail">
                    <CartItems cartItems={cartItems} />
                </div>
                <div className="cart-preview ms-auto">
                    <CartPreview cartItems={cartItems} />
                </div>
            </div>
        </div>
    )
}