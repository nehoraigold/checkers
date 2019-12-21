//region imports
import React from "react";
import "../style/Space.css";
import Checker from "./Checker";
import { connect } from "react-redux";
import { chooseSpace } from "../store/actions";
//endregion

const Space = ({ color, hasChecker, coordinate, canSelectSpace, selectSpace }) => {
    const onSpaceClick = () => canSelectSpace ? selectSpace(coordinate) : null;
    return (
        <div className={`space ${color} ${canSelectSpace ? "selectable" : ""}`} onClick={onSpaceClick}>
            {hasChecker ? <Checker coordinate={coordinate}/> : null}
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return { selectSpace: coordinate => dispatch(chooseSpace(coordinate)) };
};


const mapStateToProps = ({ gameState }, ownProps) => {
    return {
        canSelectSpace: gameState.possibleMoveCoordinates.some(coordinate =>
            coordinate[0] === ownProps.coordinate[0] && coordinate[1] === ownProps.coordinate[1]),
        hasChecker: gameState.boardState[ownProps.coordinate[1]][ownProps.coordinate[0]] !== null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Space);