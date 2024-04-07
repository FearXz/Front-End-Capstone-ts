import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { groupProductsByType } from "../../../../functions/functions";
import { LocaleIdResponse } from "../../../../interfaces/interfaces";

function MainOrderSideBar() {
  const locale: LocaleIdResponse | null = useSelector((state: RootState) => state.searchRistorante.localeById);
  const categoryObj = groupProductsByType(locale);

  return (
    <div className="col-xxl-2 col-xl-3 col-sm-4 col-12 py-3 d-sm-block d-none">
      <div className="list-group sticky-top top-90 py-4 rounded-0">
        {categoryObj &&
          Object.keys(categoryObj).map((category: string, index: number) => (
            <a
              key={category + index}
              href={`#${category}`}
              className="fw-bold text-uppercase py-2 d-block px-3 list-group-item list-group-item-action "
            >
              {category}
            </a>
          ))}
      </div>
    </div>
  );
}

export default MainOrderSideBar;
