//region imports
import React from "react";
import "../style/Checker.css";
import CrownIcon from "./CrownIcon";
import { chooseChecker } from "../store/action"
import { connect } from "react-redux";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
//endregion

const Checker = ({ color, isKing, coordinate, chooseChecker, isCheckerSelectable, isCheckerSelected }) => {
    const onCheckerClick = () => {
        if (isCheckerSelectable) {
            chooseChecker(coordinate);
        }
    };

    return (
        <div className={`checker ${color} ${isCheckerSelected ? "selected" : ""}`} onClick={onCheckerClick}>
            {isKing ? <CrownIcon color={color === PLAYER_1_COLOR ? PLAYER_2_COLOR : PLAYER_1_COLOR}/> : null}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const checker = state.boardState[ownProps.coordinate[1]][ownProps.coordinate[0]];
    const isSelected = state.chosenCheckerCoordinate !== null
        && state.chosenCheckerCoordinate[0] === ownProps.coordinate[0]
        && state.chosenCheckerCoordinate[1] === ownProps.constructor[1];
    return {
        isCheckerSelectable: state.currentPlayer === checker.color,
        isCheckerSelected: isSelected,
        color: checker.color,
        isKing: checker.isKing
    }
};

const mapDispatchToProps = dispatch => {
    return {
        chooseChecker: coordinate => dispatch(chooseChecker(coordinate))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checker);