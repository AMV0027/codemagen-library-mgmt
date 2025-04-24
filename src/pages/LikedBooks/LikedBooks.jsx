import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeLikedBook } from "../../features/LikedBooksReducer";
import BookCard from "../../components/BookCard/BookCard";
import "./styles.scss";

const LikedBooks = () => {
  const dispatch = useDispatch();
  const likedBooks = useSelector((state) => state.likedBooksReducer.likedBooks);

  const handleRemove = (book) => {
    dispatch(removeLikedBook(book._id));
  };

  return (
    <div className="liked-books-container">
      {likedBooks.length > 0 ? (
        <div className="books-grid">
          {likedBooks.map((book) => (
            <BookCard
              key={book._id}
              item={book}
              showLikeButton={false}
              showRemoveButton={true}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">You haven't liked any books yet.</p>
      )}
    </div>
  );
};

export default LikedBooks;
