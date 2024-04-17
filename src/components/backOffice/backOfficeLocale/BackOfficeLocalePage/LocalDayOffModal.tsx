import { useDispatch, useSelector } from "react-redux";
import { GetBoLocaleIdResponse } from "../../../../interfaces/interfaces";
import { AppDispatch, RootState } from "../../../../redux/store/store";

function LocalDayOffModal() {
  const locale: GetBoLocaleIdResponse | null = useSelector((state: RootState) => state.backoffice.localeById);
  const dispatch: AppDispatch = useDispatch();

  return <div>LocalDayOffModal</div>;
}

export default LocalDayOffModal;
