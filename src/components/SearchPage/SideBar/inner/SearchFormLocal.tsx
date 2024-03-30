import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { setFiltroSearchBar } from "../../../../redux/reducers/searchRistoranteReducer";

function SearchFormLocal() {
  const dispatch: any = useDispatch();
  const indirizzoCercato = useSelector((state: RootState) => state.persist.indirizzoCercato);
  const filtroSearchBar = useSelector((state: RootState) => state.searchRistorante.filtroSearchBar);

  return (
    <div>
      <span className="text-leaf-500 fw-bold ">{indirizzoCercato ? indirizzoCercato.display_name : ""}</span>
      <span className="d-block"></span>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          className="rounded-0 fix-h-50  my-input"
          type="text"
          placeholder="Cerca il tuo locale preferito"
          value={filtroSearchBar}
          onChange={(e) => dispatch(setFiltroSearchBar(e.target.value))}
        />
      </Form.Group>
    </div>
  );
}

export default SearchFormLocal;
