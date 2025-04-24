import React from "react";
import { Col, Container, Figure, ListGroup, Row, Stack } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function BookPreview() {
  const { state } = useLocation();

  if (!state) return <p>No book data available</p>;

  const {
    _id,
    authors,
    categories,
    isbn,
    longDescription,
    pageCount,
    publishedDate,
    shortDescription,
    status,
    thumbnailUrl,
    title,
  } = state;

  return (
    <Container bg="light">
      <Row className="g-3">
        <Col xs={12} md={6} className="text-center">
          <div>
            <h3 className="title">{title}</h3>
            <Figure.Image
              src={thumbnailUrl || "https://placehold.co/400x600"}
              alt={title}
              width="75%"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/400x600";
              }}
            />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <ListGroup>
            <ListGroup.Item>
              <strong>Authors:</strong> {authors?.join(", ")}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Categories:</strong> {categories?.join(", ")}
            </ListGroup.Item>
            {shortDescription && (
              <ListGroup.Item>
                <strong>Summary:</strong> <br />
                {shortDescription}
              </ListGroup.Item>
            )}
            {longDescription && (
              <ListGroup.Item>
                <strong>Deep Summary:</strong> <br />
                {longDescription}
              </ListGroup.Item>
            )}
            <Stack direction="horizontal" gap={3} className="flex-wrap">
              <p className="p-2">
                <strong>ISBN:</strong> {isbn}
              </p>
              <p className="p-2">
                <strong>Page Count:</strong>
                {pageCount}
              </p>
              <p className="p-2">
                <strong>Status:</strong>
                {status}
              </p>
            </Stack>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default BookPreview;
