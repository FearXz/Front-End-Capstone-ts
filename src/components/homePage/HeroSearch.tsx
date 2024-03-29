import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import HeroSearchForm from "./HeroSearchForm";

function HeroSearch() {
  return (
    <section className=" section-search d-flex align-items-center">
      <Container className="z-1">
        <Row>
          <Col className="text-center text-white ">
            <p className="display-1 mb-0 font-breef">ORDINA</p>
            <p className=" fs-3 fst-italic fw-medium ">i Piatti che Ami dai tuoi Locali Preferiti</p>
          </Col>
        </Row>
        <HeroSearchForm />
      </Container>
    </section>
  );
}

export default HeroSearch;
