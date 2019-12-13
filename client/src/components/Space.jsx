//region imports
import React from "react";
import "./style/Space.css";
import Checker from "./Checker";
import { connect } from "react-redux";
//endregion

const Space = ({ color, coordinate, checker }) =>
    <div className={`space ${color}`}>
        {checker ? <Checker color={checker} coordinate={coordinate}/> : null}
    </div>;


const mapStateToProps = (state, ownProps) => {
    return {
        checker: state.boardState[ownProps.coordinate[1]][ownProps.coordinate[0]]
    };
};

export default connect(mapStateToProps)(Space);