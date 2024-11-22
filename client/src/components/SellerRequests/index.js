import { useEffect, useState } from "react";
import Collapsible from "../Collapsible";
import SellerRequest from "../SellerRequest";
import { approveSellerById, getUnapprovedSellers } from "../../api/admin";

export default function SellerRequests() {
    const [unApprovedSellers, setUnapprovedSellers] = useState([]);
    const fetchSellerRequests = () => {
        getUnapprovedSellers().then((unApprovedSellers) => {
            setUnapprovedSellers(
                unApprovedSellers.map((seller) => ({
                    sellerId: seller.id,
                    userId: seller.user.id,
                    username: seller.user.username,
                    isApproved: seller.isApproved,
                }))
            );
        });
    };
    useEffect(() => {
        fetchSellerRequests();
    }, []);

    const onApprove = (sellerId) => {
        approveSellerById(sellerId)
            .then((response) => {
                if (response.status > 299) {
                    throw new Error("Can not approve this seller");
                }
                return true;
            })
            .then(() => {
                fetchSellerRequests();
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <div className="bg-light p-3 rounded shadow-sm">
            <Collapsible
                title={
                    <h2 className="h5 mb-0">
                        Requests{" "}
                        <span className="badge bg-primary">
                            {unApprovedSellers.length}
                        </span>
                    </h2>
                }
                collapsed={false}
            >
                {unApprovedSellers.map((seller, index) => (
                    <div key={index} className="mb-3">
                        <SellerRequest
                            username={seller.username}
                            onApprove={onApprove.bind(this, seller.sellerId)}
                        />
                        {index < unApprovedSellers.length - 1 && <hr />}
                    </div>
                ))}
            </Collapsible>
        </div>
    );
}
