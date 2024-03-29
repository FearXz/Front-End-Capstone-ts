import { Form } from "react-bootstrap";

function SearchFormLocal() {
  return (
    <div>
      <span className="text-leaf-500 fw-bold ">Via Salvador Allende,&nbsp;1</span>
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
