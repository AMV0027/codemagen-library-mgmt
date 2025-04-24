import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import {
  addMyBook,
  updateMyBook,
  clearSelectedBook,
} from "../../features/CreateBookReducer";
import { MdDelete } from "react-icons/md";
import { faker } from "@faker-js/faker";
import "./styles.scss";

function CreateBook() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.loaderReducer.books) || [];
  const createdBooks =
    useSelector((state) => state.createBookReducer.mybooks) || [];
  const selectedBook = useSelector(
    (state) => state.createBookReducer.selectedBook
  );

  const totalBooks = books.length;
  const totalCreatedBooks = createdBooks.length;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [authors, setAuthors] = useState([faker.person.firstName()]);
  const [categories, setCategories] = useState([faker.commerce.department()]);
  const [authorInput, setAuthorInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  useEffect(() => {
    if (selectedBook) {
      setValue("title", selectedBook.title);
      setValue("isbn", selectedBook.isbn);
      setValue("pageCount", selectedBook.pageCount);
      setValue("publishedDate", selectedBook.publishedDate.split("T")[0]);
      setValue("status", selectedBook.status);
      setValue("shortDescription", selectedBook.shortDescription);
      setValue("longDescription", selectedBook.longDescription);
      setValue("thumbnailUrl", selectedBook.thumbnailUrl);
      setAuthors(selectedBook.authors);
      setCategories(selectedBook.categories);
    }
  }, [selectedBook, setValue]);

  const onSubmit = (data) => {
    const inputDate = new Date(data.publishedDate);
    const formattedDate = `${inputDate.toISOString().split(".")[0]}.000-0700`;

    const formattedData = {
      _id: selectedBook ? selectedBook._id : totalBooks + totalCreatedBooks,
      authors,
      categories,
      isbn: data.isbn,
      longDescription: data.longDescription,
      pageCount: parseInt(data.pageCount, 10),
      publishedDate: formattedDate,
      shortDescription: data.shortDescription,
      status: data.status,
      thumbnailUrl: data.thumbnailUrl,
      title: data.title,
    };

    if (selectedBook) {
      dispatch(updateMyBook(formattedData));
      dispatch(clearSelectedBook());
    } else {
      dispatch(addMyBook(formattedData));
    }
  };

  const allStatus = books?.map((book) => book.status).filter(Boolean);
  const uniqueAllStatus = [...new Set(allStatus)];

  const isValidStatus = (value) => uniqueAllStatus.includes(value);

  const handleAuthorInputKeyDown = (e) => {
    if (e.key === "," && authorInput.trim()) {
      setAuthors([...authors, authorInput.trim()]);
      setAuthorInput("");
    }
  };

  const handleCategoryInputKeyDown = (e) => {
    if (e.key === "," && categoryInput.trim()) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const removeAuthor = (authorToRemove) => {
    setAuthors(authors.filter((author) => author !== authorToRemove));
  };

  const removeCategory = (categoryToRemove) => {
    setCategories(
      categories.filter((category) => category !== categoryToRemove)
    );
  };

  return (
    <Container className="py-4">
      <Card className="card-container w-100 h-100">
        <Card.Body>
          <Card.Title as="h3" className="card-title">
            {selectedBook ? "Update Your Book" : "Create Your Book"}
          </Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    {...register("title", {
                      required: "Title name is required",
                      value: faker.book.title(),
                    })}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="isbn">
                  <Form.Label>ISBN</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ISBN"
                    {...register("isbn", {
                      required: "ISBN is required",
                      value: faker.commerce.isbn(10),
                      pattern: {
                        value: /^\d{1}-\d{5}-\d{3}-[\dX]$/,
                        message: "ISBN must follow the format X-XXXXX-XXX-X, where X is a digit or 'X' as the check digit",
                      },
                    })}
                    isInvalid={!!errors.isbn}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.isbn?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group controlId="authors">
                  <Form.Label>Authors</Form.Label>
                  <div className="mb-2">
                    {authors.map((author, i) => (
                      <Badge bg="primary" key={i} className="me-1 mb-1">
                        {author}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 ms-1 align-baseline"
                          onClick={() => removeAuthor(author)}
                          aria-label={`Remove ${author}`}
                          style={{ color: "#fff", textDecoration: "none" }}
                        >
                          <MdDelete />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Form.Control
                    type="text"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    onKeyDown={handleAuthorInputKeyDown}
                    placeholder="Add Author"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="categories">
                  <Form.Label>Categories</Form.Label>
                  <div className="mb-2">
                    {categories.map((category, i) => (
                      <Badge bg="info" key={i} className="me-1 mb-1">
                        {category}
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0 ms-1 align-baseline"
                          onClick={() => removeCategory(category)}
                          aria-label={`Remove ${category}`}
                          style={{ color: "#fff", textDecoration: "none" }}
                        >
                          <MdDelete />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <Form.Control
                    type="text"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    onKeyDown={handleCategoryInputKeyDown}
                    placeholder="Add Category"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group controlId="pageCount">
                  <Form.Label>Number of pages</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Page Count"
                    {...register("pageCount", {
                      required: "Page count is required",
                      value: faker.number.int({ min: 1, max: 1000 }),
                    })}
                    isInvalid={!!errors.pageCount}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pageCount?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="publishedDate">
                  <Form.Label>Date of Publication</Form.Label>
                  <Form.Control
                    type="date"
                    {...register("publishedDate", {
                      required: "Published date is required",
                      value: faker.date
                        .between({
                          from: "2000-01-01",
                          to: Date.now(),
                        })
                        .toISOString()
                        .split("T")[0],
                    })}
                    isInvalid={!!errors.publishedDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.publishedDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group controlId="status">
                  <Form.Label>Book Publication status</Form.Label>
                  <Form.Select
                    {...register("status", {
                      required: "Status is required",
                      validate: (value) => {
                        if (!isValidStatus(value)) {
                          setValue("status", "Invalid status");
                          return "Invalid status";
                        }
                        return true;
                      },
                    })}
                    isInvalid={!!errors.status}
                  >
                    <option value="">Select Status</option>
                    {uniqueAllStatus.map((status, idx) => (
                      <option key={idx} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.status?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="thumbnailUrl">
                  <Form.Label>Book Cover URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Thumbnail URL"
                    {...register("thumbnailUrl", {
                      required: "Thumbnail URL is required",
                      value:
                        "https://imgs.search.brave.com/0c0-tTGODoWtcy3GHL3qrimeH-lm_wlT9VvfH0C-Js4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/MTgxNjY0L3Bob3Rv/L29ybmF0ZS1vbGQt/Ym9vay1jb3Zlci5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/bWl3eGZ6ejVTWkJr/cjRBZTNuSjFLWGdz/dUU3WjZKRkxxSVFr/SE5NZ0RSUT0",
                    })}
                    isInvalid={!!errors.thumbnailUrl}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.thumbnailUrl?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group controlId="shortDescription">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    placeholder="Short Description"
                    {...register("shortDescription", {
                      required: "Short description is required",
                      value: faker.lorem.paragraph({ min: 5, max: 8 }),
                    })}
                    isInvalid={!!errors.shortDescription}
                  />
                  <Form.Control.Feedback type="invalid" className="h-25">
                    {errors.shortDescription?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="longDescription">
                  <Form.Label>Long Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    placeholder="Long Description"
                    {...register("longDescription", {
                      required: "Long description is required",
                      value: faker.lorem.paragraph({ min: 10, max: 15 }),
                    })}
                    isInvalid={!!errors.longDescription}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.longDescription?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-4">
              <Button type="submit" variant="primary" size="md">
                {selectedBook ? "Update your Book" : "Add your Book"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreateBook;
