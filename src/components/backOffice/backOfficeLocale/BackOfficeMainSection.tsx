import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { LOCALE, ORDINI } from "../../../functions/config";
import BackOfficeLocaleHeader from "./BackOfficeLocaleHeader";
import BackOfficeLocaleOrdini from "./BackOfficeLocaleOrdini";

function BackOfficeMainSection() {
  const selectedOption: string = useSelector((state: RootState) => state.persist.selectedBoPage);

  if (selectedOption === LOCALE) {
    return <BackOfficeLocaleHeader />;
  }
  if (selectedOption === ORDINI) {
    return <BackOfficeLocaleOrdini />;
  }
  return <div></div>;
}

export default BackOfficeMainSection;
