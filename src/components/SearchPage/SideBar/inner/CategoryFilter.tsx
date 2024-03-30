import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { CategorieResponse } from "../../../../interfaces/interfaces";
import { useEffect } from "react";
import { fetchListaCategorie } from "../../../../redux/actions/LocalPageAction";

function CategoryFilter() {
  const listaCategorie = useSelector((state: RootState) => state.searchRistorante.listaCategorie);
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchListaCategorie());
  }, []);

  return (
    <div id="filter">
      <div className="border-bottom py-3">
        <h4 className="h5 text-uppercase fw-bold">CATEGORIE</h4>
        <div
          id="search-filters-categories"
          className="filters_categories"
          style={{ overflow: "auto", maxHeight: "500px" }}
        >
          {listaCategorie &&
            listaCategorie.map((categoria: CategorieResponse, index) => (
              <div key={`form-${index}`} className="form-check ms-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="types"
                  value={categoria.idCategorie}
                  id={"id-" + index}
                />
                <label className="form-check-label" typeof={"id-" + index}>
                  {categoria.nomeCategoria}{" "}
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
