//region imports
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

//endregion

function render() {
    ReactDOM.render(
        <App/>,
        document.getElementById("root"));
}

document.addEventListener("DOMContentLoaded", render);