import { StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons";
import Rating from "react-rating";

export default function ProductReview(props) {
  const { author, title, content, rating } = props;

  return (
    <div className="bg-light p-3 rounded shadow-sm mb-4">
      <div className="d-flex align-items-start">
        <div className="me-3">
          <div
            className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle"
            style={{ width: "50px", height: "50px" }}
          >
            <UserOutlined style={{ fontSize: "24px" }} />
          </div>
        </div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="fw-bold">{author}</div>
            <Rating
              initialRating={rating}
              readonly
              emptySymbol={<StarOutlined style={{ fontSize: "16px", color: "#ffc107" }} />}
              fullSymbol={<StarFilled style={{ fontSize: "16px", color: "#ffc107" }} />}
            />
          </div>
          <h5 className="mb-1">{title}</h5>
          <p className="text-muted small mb-0">{content}</p>
        </div>
      </div>
    </div>
  );
}
