import { StarFilled, StarOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import Rating from "react-rating";
import { UserRole } from "../../constants/UserRole/index";
import { useUserContext } from '../../contexts/UserContextProvider';
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export default function ProductReview(props) {
  const { author, title, content, rating, onDelete } = props;
  const { userData } = useUserContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    onDelete?.();
  };

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
            <div className="d-flex align-items-center">
              <Rating
                initialRating={rating}
                readonly
                emptySymbol={<StarOutlined style={{ fontSize: "16px", color: "#ffc107" }} />}
                fullSymbol={<StarFilled style={{ fontSize: "16px", color: "#ffc107" }} />}
              />
              {userData.role === UserRole.ADMIN && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-3 d-flex align-items-center"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <DeleteOutlined className="me-1" />
                  Delete
                </Button>
              )}
            </div>
          </div>
          <h5 className="mb-1">{title}</h5>
          <p className="text-muted small mb-0">{content}</p>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this review? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
