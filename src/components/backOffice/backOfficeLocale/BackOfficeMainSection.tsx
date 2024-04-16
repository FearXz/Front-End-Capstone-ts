import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { LOCALE, ORDINI } from "../../../functions/config";

import BackOfficeLocaleOrdini from "./BackOfficeLocaleOrdini";
import BackOfficeLocalePage from "./BackOfficeLocalePage";

function BackOfficeMainSection() {
  const selectedOption: string = useSelector((state: RootState) => state.persist.selectedBoPage);

  if (selectedOption === LOCALE) {
    return <BackOfficeLocalePage />;
  }
  if (selectedOption === ORDINI) {
    return <BackOfficeLocaleOrdini />;
  }
  return <div></div>;
}

export default BackOfficeMainSection;
