import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { INGREDIENTI, LOCALE, ORDINI } from "../../../functions/config";

import BackOfficeLocaleOrdini from "./BackOfficeMainSection/BackOfficeLocaleOrdini";
import BackOfficeLocalePage from "./BackOfficeMainSection/BackOfficeLocalePage";
import BackOfficeLocaleIngredienti from "./BackOfficeLocaleIngredienti";

function BackOfficeMainSection() {
  const selectedOption: string = useSelector((state: RootState) => state.persist.selectedBoPage);

  if (selectedOption === LOCALE) {
    return <BackOfficeLocalePage />;
  }
  if (selectedOption === ORDINI) {
    return <BackOfficeLocaleOrdini />;
  }
  if (selectedOption === INGREDIENTI) {
    return <BackOfficeLocaleIngredienti />;
  }
  return <div></div>;
}

export default BackOfficeMainSection;
