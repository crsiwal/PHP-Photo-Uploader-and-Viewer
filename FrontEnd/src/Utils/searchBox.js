import store from "../store/store";
import { enableSearch, setRecord } from "../store/features/search/searchSlice";
export const enableSearchBox = () => {
  store.dispatch(setRecord(""));
  store.dispatch(enableSearch(true));
};

export const disableSearchBox = () => {
  store.dispatch(setRecord(""));
  store.dispatch(enableSearch(false));
};
