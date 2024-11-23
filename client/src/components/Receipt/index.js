import React from "react";
import { PrinterOutlined } from "@ant-design/icons";

export default function OrderReceipt({ order }) {
    const calculateTotal = () =>
        order.items.reduce((total, item) => total + item.price * item.quantity, 0);

    const printReceipt = () => {
        window.print(); // Simple print for now; can extend for PDFs or advanced layouts
    };

    return (
        <>
            {order && <div className="container my-5 border rounded p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Order Receipt</h1>
                    <button className="btn btn-primary" onClick={printReceipt}>
                        <PrinterOutlined /> Print Receipt
                    </button>
                </div>

                <div className="mb-4">
                    <h4>Order Information</h4>
                    <p><b>Order ID:</b> {order.id}</p>
                    <p><b>Status:</b> {order.orderStatus}</p>
                    <p><b>Order Date:</b> {new Date(order.created_date).toLocaleDateString()}</p>
                    <p><b>Last Updated:</b> {new Date(order.updated_date).toLocaleDateString()}</p>
                </div>

                <div className="mb-4">
                    <h4>Buyer Information</h4>
                    <p><b>Username:</b> {order.buyer?.user?.username}</p>
                    <p><b>Email:</b> {order.buyer?.user?.email}</p>
                </div>

                <div className="mb-4">
                    <h4>Seller Information</h4>
                    <p><b>Username:</b> {order.seller?.user?.username}</p>
                    <p><b>Email:</b> {order.seller?.user?.email}</p>
                    <p><b>Approval Status:</b> {order?.seller?.isApproved ? "Approved" : "Not Approved"}</p>
                </div>

                <div className="mb-4">
                    <h4>Shipping Address</h4>
                    <p>
                        {order.address?.street}, {order.address?.city}, {order.address?.state}{" "}
                        {order.address?.zipCode}
                    </p>
                </div>

                <div className="mb-4">
                    <h4>Items</h4>
                    {order.items.map((item) => (
                        <div key={item.id} className="border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center">
                                <img
                                    src={item.product?.imageUrl}
                                    alt={item.product?.name}
                                    width={80}
                                    height={80}
                                    className="me-3"
                                />
                                <div className="flex-grow-1">
                                    <h5 className="mb-1">{item.product?.name}</h5>
                                    <p className="mb-1"><b>Description:</b> {item.product?.description}</p>
                                    <p className="mb-1"><b>Unit Price:</b> ${item.product?.price.toFixed(2)}</p>
                                    <p><b>Quantity:</b> {item.quantity}</p>
                                </div>
                                <p className="ms-auto"><b>${(item.price * item.quantity).toFixed(2)}</b></p>
                            </div>
                        </div>
                    ))}
                    <div className="text-end">
                        <h5><b>Total:</b> ${calculateTotal().toFixed(2)}</h5>
                    </div>
                </div>
            </div>}
        </>
    );
}