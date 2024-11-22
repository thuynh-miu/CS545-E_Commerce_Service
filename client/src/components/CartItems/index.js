import CartItem from "../CartItem";


export default function CartItems(props) {
    const {cartItems} = props;   
    return (
        <div>
            <h4 className="mb-4">Items in Your Cart</h4>
            <div className="list-group">
                {cartItems.map((item, index) => (
                    <div key={index} className="list-group-item bg-light rounded mb-3 p-3 shadow-sm">
                        <CartItem key={item.id} item={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}