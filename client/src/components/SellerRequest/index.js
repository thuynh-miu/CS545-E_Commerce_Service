import { UserOutlined } from "@ant-design/icons";

export default function SellerRequest({ username, onApprove }) {
    return (
        <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm mb-2">
            <div className="d-flex align-items-center">
                <UserOutlined
                    className="me-2 text-primary"
                    style={{ fontSize: "1.2rem" }}
                />
                <span className="fw-bold">{username}</span>
            </div>
            <div className="ms-auto">
                {/* <button className="btn btn-outline-danger btn-sm me-2">
          Decline
        </button> */}
                <button
                    className="btn btn-outline-success btn-sm"
                    onClick={onApprove}
                >
                    Approve
                </button>
            </div>
        </div>
    );
}
