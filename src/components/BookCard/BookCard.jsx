import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import "./styles.scss";

const BookCard = ({
  item,
  handleLikedbutton,
  showLikeButton = true,
  showRemoveButton = false,
  handleRemove,
}) => {
  const likedBooks = useSelector((state) => state.likedBooksReducer.likedBooks);
  return (
    <Card className="shadow-sm mb-4 border-0" bg="light">
      <Link to="/bookpreview" state={item} style={{ textDecoration: "none" }}>
        <div className="card-image-container">
          <Card.Img
            variant="top"
            src={item.thumbnailUrl || "https://placehold.co/400x600"}
            alt={item.title}
            className="card-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x600";
            }}
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column justify-content-between card-body">
        <div>
          <Card.Title as="h5" className="text-center mb-2 card-title">
            {item.title}
          </Card.Title>
          <div className="mb-2">
            <div className="fw-semibold small text-secondary">Authors</div>
            <div className="d-flex flex-wrap gap-1">
              {item.authors
                ?.filter((auth) => auth.trim() !== "")
                .map((auth, i) => (
                  <Badge bg="primary" key={i} className="author-badge">
                    {auth}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="mb-2">
            <div className="fw-semibold small text-secondary">Categories</div>
            <div className="d-flex flex-wrap gap-1">
              {item.categories
                ?.filter((cat) => cat.trim() !== "")
                .map((cat, i) => (
                  <Badge bg="info" key={i} className="category-badge">
                    {cat}
                  </Badge>
                ))}
            </div>
          </div>
          <div className="d-flex flex-column gap-1 small text-secondary mb-2 mt-2">
            <div>
              <span className="fw-semibold">ISBN:</span>{" "}
              <span className="text-dark">{item.isbn}</span>
            </div>
            <div>
              <span className="fw-semibold">Published:</span>{" "}
              <span className="text-dark">
                {item.publishedDate?.$date
                  ? new Date(item.publishedDate.$date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2 m-3 position-absolute bottom-0 end-0 action-buttons">
          {showLikeButton && (
            <Button
              variant={
                likedBooks?.some((book) => book._id === item._id)
                  ? "danger"
                  : "primary"
              }
              onClick={() => handleLikedbutton(item)}
              className="like-button"
              aria-label={
                likedBooks?.some((book) => book._id === item._id)
                  ? `Unlike ${item.title}`
                  : `Like ${item.title}`
              }
            >
              <AiFillLike />
            </Button>
          )}
          {showRemoveButton && (
            <Button
              variant="danger"
              onClick={() => handleRemove(item)}
              size="md"
              aria-label={`Remove ${item.title}`}
            >
              <MdDelete />
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
