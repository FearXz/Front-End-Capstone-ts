import { Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RootState } from "../../redux/store/store";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { OSMResponse } from "../../interfaces/interfaces";

function HeroSearchForm() {
  const profile = useSelector((state: RootState) => state.auth.loggedProfile);
  const fullAddress = profile ? profile.utente.indirizzo + " " + profile.utente.citta + " " + profile.utente.cap : "";
  const navigate = useNavigate();
  const provider = new OpenStreetMapProvider();
  const [address, setAddress] = useState(fullAddress);
  const [suggestions, setSuggestions] = useState<OSMResponse[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<null | number>(null);

  const handleSearchChange = async (e: any) => {
    setAddress(e.target.value);

    // Cancella il timeout precedente
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Imposta un nuovo timeout
    setSearchTimeout(
      setTimeout(async () => {
        const results: OSMResponse[] = await provider.search({ query: e.target.value });
        setSuggestions(results);
        console.log(results);
      }, 300)
    ); // Ritarda la chiamata di 1 secondo
  };

  const handleSuggestionClick = (suggestion: any) => {
    setAddress(suggestion.label);
    setSuggestions([]);
    console.log(suggestion);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    navigate(`/locali/${address}`);
  };

  return (
    <Row>
      <Col className="offset-lg-2 col-lg-8 col-12 pt-xl-5 pt-md-4 pt-3 pb-3 px-lg-3 px-sm-5 px-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
            <Form.Control
              className="rounded-0 fix-h-50  my-input"
              type="text"
              placeholder="Il tuo indirizzo (comprensivo di città e numero civico)"
              value={address}
              onChange={handleSearchChange}
            />
            <div className=" bg-white position-absolute w-100 ">
              {suggestions?.map((suggestion, index) => (
                <div
                  className="cursor-pointer suggestion p-1"
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.label}
                </div>
              ))}
            </div>
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
