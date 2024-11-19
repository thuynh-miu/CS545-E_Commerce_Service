import CartItems from "../CartItems"

export default function Cart(props) {
    const cartItems = [
        {
            id: 1,
            name: "Lenovo IdeaPad Slim 3",
            price: 299.0,
            img_url: "https://i5.walmartimages.com/seo/Lenovo-IdeaPad-1i-15-6-Intel-Core-i5-1235U-8GB-RAM-256-GB-SSD-Abyss-Blue-Windows-11-in-S-Mode-82QD00GNUS_6208c78c-db3f-41e6-8b16-4e121f57856a.473c2139b755df36f394ea7262b7f051.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
            quantity: 1
        },
    ]
    return (
        <div className="container">
            <h2 className="mb-5">Cart</h2>
            <CartItems cartItems={cartItems} />
        </div>
    )
}