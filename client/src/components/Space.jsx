//region imports
import React from "react";
import "./style/Space.css";
import Checker from "./Checker";

//endregion

const Space = ({ color, checker }) =>
    <div className={`space ${color}`}>
        {checker ? <Checker color={checker}/> : null}
    </div>;

export default Space;