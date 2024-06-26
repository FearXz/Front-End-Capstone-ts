import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store/store";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { OSMResponse } from "../../interfaces/interfaces";
import { setRestaurantId } from "../../redux/reducers/persistedInfoReducer";

function HeroSearchForm() {
  const profile = useSelector((state: RootState) => state.auth.loggedProfile);
  const fullAddress = profile ? profile.utente.indirizzo + " " + profile.utente.citta + " " + profile.utente.cap : "";
  const navigate = useNavigate();
  const provider = new OpenStreetMapProvider();
  const [address, setAddress] = useState(fullAddress);
  const [suggestions, setSuggestions] = useState<OSMResponse[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dispatch: AppDispatch = useDispatch();

  const searchBarRef = useRef<HTMLInputElement>(null);

  // Funzione per gestire la pressione dei tasti
  const handleKeyDown = (e: any) => {
    // Freccia giù
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0));
    }
    // Freccia su
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1));
    }
    // Invio
    else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (e.key === "Enter" && highlightedIndex === -1) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  // Funzione per gestire il click su una suggerimento
  const handleSuggestionClick = (suggestion: OSMResponse) => {
    setAddress(suggestion.label);
    handleReset();
    searchBarRef.current?.focus();
    console.log(suggestion);
  };
  // Funzione per gestire il campo di ricerca
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
      }, 300)
    ); // Ritarda la chiamata di 1 secondo
  };
  // Funzione per gestire l'invio del form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!address || !address.trim()) return;
    dispatch(setRestaurantId(null));
    navigate(`/searchlocal/${address}`);
  };
  // Funzione per resettare il campo di ricerca
  const handleReset = () => {
    setHighlightedIndex(-1);
    setSuggestions([]);
  };

  return (
    <Row>
      <Col className="offset-lg-2 col-lg-8 col-12 pt-xl-5 pt-md-4 pt-3 pb-3 px-lg-3 px-sm-5 px-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
            <Form.Control
              className="rounded-0 fix-h-50  my-input focus"
              type="text"
              placeholder="Il tuo indirizzo (comprensivo di città e numero civico)"
              value={address}
              onClick={handleReset}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(handleReset, 100)}
              ref={searchBarRef}
            />
            <div className=" bg-white position-absolute w-100 ">
              {suggestions?.map((suggestion, index) => (
                <div
                  className={`cursor-pointer suggestion p-1 ${index === highlightedIndex ? "highlight" : ""}`}
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
