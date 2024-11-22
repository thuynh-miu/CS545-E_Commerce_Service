import { PrinterOutlined, StarOutlined } from "@ant-design/icons";

export default function OrderDetail(props) {
    const orderDetail = {
        id: "ABCDX123",
        order_date: new Date(2024, 1, 1),
        items: [
            {
                id: 1,
                name: "Fresh Green Seedless Grapes (2.25 lbs/Bag Est.)",
                price: 1.98,
                quantity: 1,
                imageUrl:
                    "https://i5.walmartimages.com/seo/Fresh-Green-Seedless-Grapes-2-25-lbs-Bag-Est_9b543e57-d12c-4b2f-af70-cbfc8166dce1.19eafb20170233f7df74f7a6c5ff5530.jpeg?odnHeight=208&odnWidth=208&odnBg=FFFFFF",
            },
            {
                id: 2,
                name: "Great Value Disposable Paper Napkins, White, 500 Count",
                price: 2.21,
                quantity: 2,
                imageUrl:
                    "https://i5.walmartimages.com/seo/Great-Value-Disposable-Paper-Napkins-White-500-Count_8f85c677-4910-4e3d-a5c8-d7ba4a7715a6.95fcdbd0772d95c39e34d153dac90332.jpeg?odnHeight=208&odnWidth=208&odnBg=FFFFFF",
            },
        ],
        shipping_address: {
            street: "1000 N 4th St",
            city: "Fairfield",
            state: "Iowa",
            zipcode: "52557",
        },
    };
    return (
        <div className="container w-75">
            <div>
                <h1>
                    <b>
                        {orderDetail.order_date.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}{" "}
                        purchase{" "}
                    </b>
                    | Order# {orderDetail.id}
                </h1>
                <div>
                    <button className="btn btn-link">
                        <PrinterOutlined /> Print
                    </button>
                </div>
                <div className="d-flex">
                    <div className="container border rounded me-5">
                        {orderDetail.items.map((item, index) => (
                            <div>
                                <div className="d-flex">
                                    <img
                                        className="me-3"
                                        src={item.imageUrl}
                                        width={104}
                                        height={104}
                                    />
                                    <div>
                                        <p>{item.name}</p>
                                        <small>Qty {item.quantity}</small>
                                    </div>
                                    <p className="ms-auto">
                                        <b>${item.price * item.quantity}</b>
                                    </p>
                                </div>
                                <div className="d-flex">
                                    <StarOutlined />
                                    <button className="btn btn-link text-black">
                                        Write a review
                                    </button>
                                </div>
                                {index < orderDetail.items.length - 1 && <hr />}
                            </div>
                        ))}
                    </div>
                    <div>
                        <h5>Shipping Address</h5>
                        <p>
                            {orderDetail.shipping_address.street},{" "}
                            {orderDetail.shipping_address.city},{" "}
                            {orderDetail.shipping_address.state},{" "}
                            {orderDetail.shipping_address.zipcode}
                        </p>
                        <hr />

                        <h5>Payment Method</h5>

                        <hr />

                        <h5>Total</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
