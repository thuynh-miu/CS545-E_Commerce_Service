import CartItem from "../CartItem";


export default function CartItems(props) {
    const {cartItems} = props;

    return (
        <div>
            {
                cartItems.map(
                    item => <CartItem item={item} />
                )
            }
        </div>
    )
}