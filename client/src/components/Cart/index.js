import CartItems from "../CartItems"
import CartPreview from "../CartPreview"
import { useUserContext } from '../../contexts/UserContextProvider';

export default function Cart(props) {
    const { cartItems } = useUserContext();

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Your Cart</h2>
            <div className="row g-4">
                <div className="col-12 col-lg-8">
                    <div className="bg-light p-3 rounded shadow-sm">
                        <CartItems cartItems={cartItems} />
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="bg-light p-3 rounded shadow-sm">
                        <CartPreview cartItems={cartItems} />
                    </div>
                </div>
            </div>
        </div>
    );
}
