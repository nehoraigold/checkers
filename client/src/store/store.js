//region imports
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

//endregion

const store = createStore(rootReducer);

export default store;