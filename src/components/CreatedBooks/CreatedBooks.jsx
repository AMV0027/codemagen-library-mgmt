import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeMyBook,
  setSelectedBook,
} from "../../features/CreateBookReducer";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Button, Badge } from "react-bootstrap";
import "./styles.css";

function CreatedBooks() {
  const dispatch = useDispatch();
  const createdBooks = useSelector((state) => state.createBookReducer.mybooks);

  const handleUpdateClick = (book) => {
    dispatch(setSelectedBook(book));
  };

  return (
    <Container fluid className="py-3">
      {createdBooks.length > 0 ? (
        <Row className="g-4 justify-content-center">
          {createdBooks.map((item) => (
            <Col key={item._id} xs={12} sm={8} md={5} lg={4} xl={4}>
              <Card className="h-100 shadow-sm position-relative">
                <div
                  className="d-flex justify-content-end position-absolute w-100 p-2"
                  style={{ zIndex: 2, top: 0, right: 0 }}
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="me-1"
                    onClick={() => handleUpdateClick(item)}
                    title="Edit Book"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => dispatch(removeMyBook(item))}
                    title="Delete Book"
                  >
                    <MdDelete />
                  </Button>
                </div>
                <Link
                  to="/bookpreview"
                  state={item}
                  className="link-no-decoration"
                >
                  <Card.Img
                    variant="top"
                    src={item.thumbnailUrl || "https://placehold.co/400x600"}
                    alt={item.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x600";
                    }}
                    className="p-4 card-img-custom"
                  />
                </Link>
                <Card.Body className="d-flex flex-column justify-content-between card-body-custom">
                  <div>
                    <Card.Title as="h5" className="text-center mb-2" style={{ minHeight: 48 }}>
                      {item.title}
                    </Card.Title>
                    <div className="mb-2">
                      <div className="fw-semibold small text-secondary">Authors</div>
                      <div className="d-flex flex-wrap gap-1">
                        {item.authors
                          ?.filter((auth) => auth.trim() !== "")
                          .map((auth, i) => (
                            <Badge bg="primary" key={i} className="px-2 py-1 badge-custom">
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
                            <Badge bg="info" key={i} className="px-2 py-1 badge-custom">
                              {cat}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <div className="d-flex flex-column gap-1 small text-secondary mb-2 mt-2">
                      <div>
                        <span className="fw-semibold">ISBN:</span> <span className="text-dark">{item.isbn}</span>
                      </div>
                      <div>
                        <span className="fw-semibold">Published:</span> <span className="text-dark">
                          {item.publishedDate?.$date
                            ? new Date(item.publishedDate.$date).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center mt-4">
          <Card className="mx-auto p-4 no-books-card">
            <Card.Body>
              <Card.Text>No books found.</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
}

export default CreatedBooks;
