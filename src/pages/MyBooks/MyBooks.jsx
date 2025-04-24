import React from "react";
import { useSelector } from "react-redux";
import CreatedBooks from "../../components/CreatedBooks/CreatedBooks";
import CreateBook from "../../components/CreateBook/CreateBook";
import { Container } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LikedBooks from "../LikedBooks/LikedBooks";

function MyBooks() {
  return (
    <Container className="py-4 h-auto">
      <CreateBook />
      <Tabs
        defaultActiveKey="mybooks"
        id="uncontrolled-tab-example"
        className="mb-3 mt-4"
      >
        <Tab eventKey="mybooks" title="My books">
          <CreatedBooks />
        </Tab>
        <Tab eventKey="likedbooks" title="Liked Books">
          <LikedBooks />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default MyBooks;
