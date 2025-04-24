import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadBooks } from "./features/LoaderReducer";
import { loadMyBooks } from "./features/CreateBookReducer";
import { loadLikedBooks } from "./features/LikedBooksReducer";
import MyBooks from "./pages/MyBooks/MyBooks";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import BookPreview from "./pages/BookPreview/BookPreview";
import LikedBooks from "./pages/LikedBooks/LikedBooks";
import booksJson from "./assets/books.json";
import Error from "./pages/Error/Error";
import "./App.scss";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBooks(booksJson));
    dispatch(loadMyBooks(JSON.parse(localStorage.getItem("mybooks")) || []));
    dispatch(loadLikedBooks(JSON.parse(localStorage.getItem("likedBooks")) || []));
  }, [dispatch]);

  return (
    <div className="main-body">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/bookpreview" element={<BookPreview />} />
          <Route path="/likedbooks" element={<LikedBooks />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
