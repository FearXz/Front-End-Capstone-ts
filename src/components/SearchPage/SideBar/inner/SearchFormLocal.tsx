import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";

function SearchFormLocal() {
  const indirizzoCercato = useSelector((state: RootState) => state.persist.indirizzoCercato);

  return (
    <div>
      <span className="text-leaf-500 fw-bold ">{indirizzoCercato ? indirizzoCercato.display_name : ""}</span>
      <span className="d-block"></span>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          className="rounded-0 fix-h-50  my-input"
          type="text"
          placeholder="Cerca il tuo locale preferito"
          value={""}
          onChange={() => {}}
        />
      </Form.Group>
    </div>
  );
}

export default SearchFormLocal;
