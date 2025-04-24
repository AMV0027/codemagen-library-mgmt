import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadBooks } from "./features/LoaderReducer";
import { loadMyBooks } from "./features/CreateBookReducer";
import { loadLikedBooks } from "./features/LikedBooksReducer";
import MyBooks from "./pages/MyBooks/MyBooks";
import Debugger from "./pages/Debugger/Debugger";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import BookPreview from "./pages/BookPreview/BookPreview";
import LikedBooks from "./pages/LikedBooks/LikedBooks";
import booksJson from "./assets/books.json";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBooks(booksJson));
    dispatch(loadMyBooks(JSON.parse(localStorage.getItem("mybooks")) || []));
  }, [dispatch]);

  return (
    <div className="main-body">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/debug" element={<Debugger />} />
          <Route path="/bookpreview" element={<BookPreview />} />
          <Route path="/likedbooks" element={<LikedBooks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
