import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.scss";

function Header() {
  return (
    <Navbar bg="primary" variant="primary" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">
          📚 Developer Book Site
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/mybooks">
              My Books
            </Nav.Link>
            <Nav.Link as={Link} to="/likedbooks">
              Liked Books
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
