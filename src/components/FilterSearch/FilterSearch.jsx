import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setSearch } from '../../features/SearchReducer';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import './styles.scss';

function FilterSearch() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.loaderReducer.books);
    const { searchTerm, category, year } = useSelector((state) => state.searchReducer);

    const uniqueCategories = books ? [...new Set(books.flatMap(book => book.categories || []))] : [];
    const uniqueYears = books
        ? [...new Set(books.map(book => new Date(book.publishedDate?.$date).getFullYear()))].sort((a, b) => b - a)
        : [];

    const handleCategoryChange = (e) => {
        dispatch(setFilter({ category: e.target.value, year }));
    };

    const handleYearChange = (e) => {
        dispatch(setFilter({ category, year: e.target.value }));
    };

    const handleSearchChange = (e) => {
        dispatch(setSearch(e.target.value));
    };

    return (
        <div>
            <Row className="filter-search-row align-items-center g-2 mb-3">
                <Col xs={12} sm={6} md={6} lg={5} className="mb-2 mb-sm-0">
                    <Form.Group controlId="searchInput" className="mb-0">
                        <Form.Control
                            type="text"
                            placeholder="Search by title or author..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="filter-search-input"
                        />
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={3} lg={2} className="mb-2 mb-sm-0">
                    <Form.Group controlId="categorySelect" className="mb-0">
                        <Form.Select
                            value={category}
                            onChange={handleCategoryChange}
                            className="filter-category-select"
                        >
                            <option value="">Select Category</option>
                            {uniqueCategories.map((cat, i) => (
                                <option key={i} value={cat}>{cat}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={6} md={3} lg={2} className="mb-2 mb-sm-0">
                    <Form.Group controlId="yearSelect" className="mb-0">
                        <Form.Select
                            value={year}
                            onChange={handleYearChange}
                            className="filter-year-select"
                        >
                            <option value="">Select Year</option>
                            {uniqueYears.map((yr, i) => (
                                <option key={i} value={yr}>{yr}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

export default FilterSearch;
