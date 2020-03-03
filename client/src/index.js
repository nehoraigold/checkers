//region imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store/store";
import "./style/index.css";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

//endregion

function render() {
    ReactDOM.render(
        <Provider store={store}>
            <DndProvider backend={Backend}>
                <App/>
            </DndProvider>
        </Provider>,
        document.getElementById("root"));
}

render();