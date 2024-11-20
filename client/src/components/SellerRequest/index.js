import { UserOutlined } from "@ant-design/icons";

export default function SellerRequest(props) {
    const {username} = props;
    return (
    <div className="d-flex p-3">
      <div>
        <UserOutlined className="me-2" /> {username}
      </div>
      <div className="d-flex ms-auto">
        <button className="btn btn-danger me-3">
            Decline
        </button>
        <button className="btn btn-success">
            Approve
        </button>
      </div>
    </div>
  );
}
