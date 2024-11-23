import { useState } from "react";
import { Button, Badge, Alert } from "react-bootstrap";
import OrderStatus from "../../constants/OrderStatus";
import { Link } from "react-router-dom";
import { updateOrderStatus } from "../../api/seller";

export default function Order(props) {
    const { id, status, created_date, updated_date, items, total, review } = props;
    const [orderStatus, setOrderStatus] = useState(status);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(""); // "success" or "danger"

    const printReceipt = async (orderId) => {
        try {
            console.log(`Printing receipt for order: ${orderId}`);
            // Add logic here for printing the receipt
        } catch (error) {
            console.error("Failed to print receipt:", error.message);
            alert("An error occurred while trying to print the receipt.");
        }
    };

    const handleChangeStatus = async (orderId, newStatus) => {
        try {
            console.log(`Changing status for order ${orderId} to ${newStatus}`);
            await updateOrderStatus(orderId, newStatus);
            setOrderStatus(newStatus);
            setMessage(`Order status updated to ${newStatus}.`);
            setMessageType("success");
        } catch (error) {
            console.error("Failed to update order status:", error.message);
            setMessage("Failed to update order status. Please try again.");
            setMessageType("danger");
        }
    };

    const getNextStatusButton = () => {
        switch (orderStatus) {
            case OrderStatus.CREATED:
                return (
                    <>
                        <Button
                            variant="danger"
                            className="me-2"
                            onClick={() =>
                                handleChangeStatus(id, OrderStatus.CANCELLED)
                            }
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className="me-2"
                            onClick={() =>
                                handleChangeStatus(id, OrderStatus.SHIPPED)
                            }
                        >
                            Mark as Shipped
                        </Button>
                    </>
                );
            case OrderStatus.SHIPPED:
                return (
                    <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => handleChangeStatus(id, OrderStatus.TRANSIT)}
                    >
                        Mark as Transisting
                    </Button>
                );
            case OrderStatus.TRANSIT:
                return (
                    <Button
                        variant="primary"
                        className="me-2"
                        onClick={() =>
                            handleChangeStatus(id, OrderStatus.DELIVERED)
                        }
                    >
                        Mark as Delivered
                    </Button>
                );
            case OrderStatus.DELIVERED:
                return (
                    <Button variant="primary" className="me-2">
                        Write a Review
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container bg-white rounded shadow-sm mb-4">
            {message && (
                <Alert
                    variant={messageType}
                    onClose={() => setMessage(null)}
                    dismissible
                >
                    {message}
                </Alert>
            )}
            <div
                className="d-flex bg-light p-3 rounded-top border border-bottom-0"
                id={`order-${id}-header`}
            >
                <span className="my-auto">Order# {id}</span>
                <div className="ms-auto d-flex flex-wrap">
                    {getNextStatusButton()}
                    <Link to={`${id}`}>
                        <Button variant="link">View Details</Button>
                    </Link>
                </div>
            </div>
            <div className="d-flex p-3 border border-top-0 border-bottom-0">
                <span className="my-auto me-3">Status:</span>
                <Badge
                    bg={status === OrderStatus.CANCELLED ? "danger" : "success"}
                    className="p-2 my-auto"
                >
                    {status}
                </Badge>
                <div className="ms-auto text-end">
                    <small>Updated at</small>
                    <h5>
                        <b>
                            {new Date(updated_date).toLocaleDateString(
                                "en-US",
                                {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}
                        </b>
                    </h5>
                </div>
            </div>
            <div className="d-flex p-3 border border-top-0 rounded-bottom flex-column flex-md-row">
                <div className="d-flex flex-wrap">
                    {items.map((item, index) => (
                        <img
                            key={index}
                            src={item?.imageUrl}
                            width={60}
                            height={60}
                            className="me-2 mb-2"
                        />
                    ))}
                </div>
                <div className="ms-md-auto mt-3 mt-md-0 text-center text-md-end">
                    <Button
                        variant="secondary"
                        onClick={() => printReceipt(id)}
                    >
                        Print Receipt
                    </Button>
                </div>
            </div>
        </div>
    );
}
