import { StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons";
import Rating from "react-rating";

export default function ProductReview(props) {
  const { author, title, content, rating } = props;

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <div className="d-flex">
            <UserOutlined />
            <div className="ms-2">{author}</div>
          </div>
        </div>
        <div className="col-9">
          <Rating
            initialRating={rating}
            readonly={true}
            emptySymbol={<StarOutlined />}
            fullSymbol={<StarFilled />}
          />
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
