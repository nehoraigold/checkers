//region imports
import { createStore } from "redux";
import rootReducer from "../store/reducer";

//endregion

const store = createStore(rootReducer);
// store.subscribe(() => {
//     console.log(store.getState())
// });

export default store;