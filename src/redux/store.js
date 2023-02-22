import { legacy_createStore as createStore } from "redux";
import { Reducers } from "./reducers";

const mystore = createStore(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default mystore;
