import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addLikedBook,
  removeLikedBook,
} from "../../features/LikedBooksReducer";
import {
  nextPage,
  beforePage,
  resetPage,
} from "../../features/PageNumberReducer";
import BookCard from "../BookCard/BookCard";
import { Button, Container, Row, Col, ButtonGroup } from "react-bootstrap";
// import "./styles.scss";

function LatestBooks() {
  const dispatch = useDispatch();
  const databooks = useSelector((state) => state.loaderReducer.books);
  const mybooks = useSelector((state) => state.createBookReducer.mybooks);
  const {
    search = "",
    category,
    year,
  } = useSelector((state) => state.searchReducer);
  const pages = useSelector((state) => state.pageNumberReducer);
  const likedBooks = useSelector((state) => state.likedBooksReducer.likedBooks);

  const handleLikedbutton = (item) => {
    try {
      if (likedBooks.some((book) => book._id === item._id)) {
        dispatch(removeLikedBook(item._id));
      } else {
        dispatch(addLikedBook(item));
      }
    } catch (error) {
      console.error("Error managing liked book:", error);
    }
  };

  useEffect(() => {
    dispatch(resetPage());
  }, [dispatch, search, category, year]);

  const books = [
    ...(Array.isArray(databooks) ? databooks : []),
    ...(Array.isArray(mybooks) ? mybooks : []),
  ];

  useEffect(() => {
    dispatch(resetPage());
  }, [search, category, year]);

  if (!books) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const filteredBooks = books.filter((book) => {
    const matchesText =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      (book.authors &&
        book.authors.some((author) =>
          author.toLowerCase().includes(search.toLowerCase())
        ));

    const matchesCategory = category
      ? book.categories?.includes(category)
      : true;

    const bookYear = book.publishedDate
      ? new Date(book.publishedDate.$date || book.publishedDate).getFullYear()
      : null;
    const matchesYear = year ? String(bookYear) === String(year) : true;

    return matchesText && matchesCategory && matchesYear;
  });

  const currentBooks = filteredBooks.slice(
    pages.indexOfFirstBook,
    pages.indexOfLastBook
  );

  return (
    <Container fluid className="py-3">
      <Row className="g-3 justify-content-center">
        {currentBooks.length > 0 ? (
          currentBooks.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={4} lg={4} xl={3}>
              <BookCard item={item} handleLikedbutton={handleLikedbutton} />
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <p className="text-muted">No books found.</p>
          </Col>
        )}
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <ButtonGroup>
            <Button
              variant="outline-primary"
              onClick={() => dispatch(beforePage())}
            >
              Back
            </Button>
            <Button variant="light" disabled>
              {pages.currentPageNumber}
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => dispatch(nextPage())}
            >
              Next
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default LatestBooks;
