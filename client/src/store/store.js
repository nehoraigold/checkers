//region imports
import { createStore } from "redux";
import rootReducer from "../reducers/reducers";

//endregion

const store = createStore(rootReducer);
store.subscribe(() => {
    console.log(store.getState())
});

export default store;