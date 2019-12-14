//region imports
import { createStore } from "redux";
import rootReducer from "../store/reducer";

//endregion

const store = createStore(rootReducer);

export default store;