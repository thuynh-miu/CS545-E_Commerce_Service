import { PrinterOutlined, StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import { getOrderById } from "../../api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import OrderStatus from "../../constants/OrderStatus";

export default function OrderDetail(props) {
    const navigate = useNavigate();

    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    useEffect(() => {
        getOrderById(orderId).then((data) => {
            setOrderDetail(data);
        });
    }, [orderId]);
    const goBack = () => {
        navigate(-1);
    };

    const printReceipt = async () => {
        try {
            const receiptElement = document.getElementById("order-receipt");
            if (!receiptElement) {
                throw new Error("Receipt element not found.");
            }

            const canvas = await html2canvas(receiptElement, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF();
            const imgWidth = 190; // PDF width in mm
            const pageHeight = 285; // PDF height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

            pdf.save(`order_${orderId}_receipt.pdf`);
        } catch (error) {
            console.error("Failed to print receipt:", error.message);
            alert("An error occurred while trying to print the receipt.");
        }
    };

    return (
        <div className="container w-75">
            <div>
                <h1>
                    <b>{orderDetail?.orderDate?.substring(0, 10)} purchase </b>|
                    Order# {orderDetail?.id}
                </h1>
                <div>
                    {orderDetail?.status == OrderStatus.DELIVERED && (
                        <button className="btn btn-link" onClick={printReceipt}>
                            <PrinterOutlined /> Print
                        </button>
                    )}
                </div>
                <div id="order-receipt" className="d-flex mb-3">
                    <div className="container border rounded me-5">
                        {orderDetail?.items &&
                            orderDetail?.items.map((item, index) => (
                                <div>
                                    <div className="d-flex">
                                        <img
                                            className="me-3"
                                            src={item?.product?.imageUrl}
                                            width={104}
                                            height={104}
                                        />
                                        <div>
                                            <p>{item?.product?.name}</p>
                                            <small>Qty {item?.quantity}</small>
                                        </div>
                                        <p className="ms-auto">
                                            <b>
                                                ${item.price * item?.quantity}
                                            </b>
                                        </p>
                                    </div>
                                    <div className="d-flex">
                                        <StarOutlined />
                                        <Link to={`review/${item?.id}`}>
                                            <button className="btn btn-link text-black">
                                                Write a review
                                            </button>
                                        </Link>
                                    </div>
                                    {index < orderDetail?.items?.length - 1 && (
                                        <hr />
                                    )}
                                </div>
                            ))}
                    </div>
                    <div>
                        <h5>Shipping Address</h5>
                        <p>
                            {orderDetail?.address?.street},{" "}
                            {orderDetail?.address?.city},{" "}
                            {orderDetail?.address?.state},{" "}
                            {orderDetail?.address?.zipCode}
                        </p>
                        <hr />

                        <h5>
                            <div className="d-flex">
                                Total:
                                <span className="ms-auto">
                                    <b>${orderDetail.total}</b>
                                </span>
                            </div>
                        </h5>
                    </div>
                </div>
                <div className="d-flex">
                    <button
                        className="btn btn-warning mx-auto"
                        onClick={goBack}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}
