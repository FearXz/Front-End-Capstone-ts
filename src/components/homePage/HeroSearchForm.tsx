import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchHomeAddress } from "../../redux/actions/homeSearchAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "@reduxjs/toolkit/query";
import { useState } from "react";

function HeroSearchForm() {
  const profile = useSelector((state) => state.auth.loggedProfile);
  const dispatch = useDispatch();
  const fullAddress = profile ? profile.utente.indirizzo + " " + profile.utente.citta + " " + profile.utente.cap : "";
  const [address, setAddress] = useState(fullAddress);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(searchHomeAddress(address, navigate));
  };

  return (
    <Row>
      <Col className="offset-lg-2 col-lg-8 col-12 pt-xl-5 pt-md-4 pt-3 pb-3 px-lg-3 px-sm-5 px-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="rounded-0 fix-h-50  my-input"
              type="text"
              placeholder="Il tuo indirizzo (comprensivo di città e numero civico)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <div className=" text-center">
            <Button type="submit" className=" btn-leaf-500 rounded-0 button-border-success text-white fw-semibold">
              CONSEGNA
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default HeroSearchForm;
