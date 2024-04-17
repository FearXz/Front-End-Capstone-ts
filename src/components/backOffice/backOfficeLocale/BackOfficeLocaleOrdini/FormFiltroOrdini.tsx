import { Dropdown, Form } from "react-bootstrap";
import { AppDispatch, RootState } from "../../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilterOrder, setStatusFilterOrder } from "../../../../redux/reducers/backofficeReducer";
import { ALLORDER, CONFIRMED, READY, TODO } from "../../../../functions/config";
import { toggleRefresh } from "../../../../redux/reducers/stateReducer";

interface FormFiltroOrdiniProps {
  setCurrentPage: (page: number) => void;
}

function FormFiltroOrdini(props: FormFiltroOrdiniProps) {
  const dispatch: AppDispatch = useDispatch();
  const searchValue: string = useSelector((state: RootState) => state.backoffice.searchFilterOrder);

  function handleStatusFilter(status: string) {
    dispatch(setStatusFilterOrder(status));
    props.setCurrentPage(1);
    dispatch(toggleRefresh());
  }

  return (
    <div className="mb-3 d-flex align-item-center">
      <Form.Control
        className="rounded-0 fix-h-50  my-input focus"
        type="text"
        placeholder="Cerca Ordine"
        value={searchValue}
        onChange={(e) => dispatch(setSearchFilterOrder(e.target.value))}
      />
      <Dropdown className="d-flex align-item-center">
        <Dropdown.Toggle className="btn btn-leaf-500 text-white button-border-success rounded-0" id="dropdown-basic">
          Filtro
        </Dropdown.Toggle>
        <Dropdown.Menu className="rounded-0 ">
          <Dropdown.Item className="sideHover" onClick={() => handleStatusFilter(ALLORDER)}>
            Tutti gli ordini
          </Dropdown.Item>
          <Dropdown.Item className="sideHover" onClick={() => handleStatusFilter(TODO)}>
            Da preparare
          </Dropdown.Item>
          <Dropdown.Item className="sideHover" onClick={() => handleStatusFilter(READY)}>
            Pronti
          </Dropdown.Item>
          <Dropdown.Item className="sideHover" onClick={() => handleStatusFilter(CONFIRMED)}>
            Confermati
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default FormFiltroOrdini;
