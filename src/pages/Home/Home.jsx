import React from "react";
import LatestBooks from "../../components/LatestBooks/LatestBooks";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container fluid className="py-4">
      <FilterSearch />
      <div className="my-3" />
      <LatestBooks />
    </Container>
  );
}

export default Home;
