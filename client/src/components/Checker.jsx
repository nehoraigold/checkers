//region imports
import React from "react";
import "../style/Checker.css";
import CrownIcon from "./CrownIcon";
import { chooseChecker } from "../store/actions"
import { connect } from "react-redux";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
//endregion

const Checker = ({ color, isKing, coordinate, chooseChecker, isSelectable, isSelected, isRestricted, isToken }) => {
    const onCheckerClick = () => {
        if (isSelectable) {
            chooseChecker(coordinate);
        }
    };
    return (
        <div
            className={`checker ${color} 
                ${isToken ? "token" : ""}
                ${isSelected ? "selected" : ""} 
                ${isRestricted ? "restricted" : ""} 
                ${isSelectable ? "selectable" : ""}`}
            onClick={isToken ? null : onCheckerClick}>
            {isKing ? <CrownIcon color={color === PLAYER_1_COLOR ? PLAYER_2_COLOR : PLAYER_1_COLOR}/> : null}
        </div>
    );
};

const mapStateToProps = ({ gameState }, ownProps) => {
    if (ownProps.isToken) {
        return {};
    }
    const checker = gameState.boardState[ownProps.coordinate[1]][ownProps.coordinate[0]];
    const isSelected = gameState.chosenCheckerCoordinate !== null
        && gameState.chosenCheckerCoordinate[0] === ownProps.coordinate[0]
        && gameState.chosenCheckerCoordinate[1] === ownProps.coordinate[1];
    const isRestricted = gameState.coordinateRestrictions.some(coordinate => {
        return coordinate[0] === ownProps.coordinate[0] && coordinate[1] === ownProps.coordinate[1];
    });
    const isSelectable = gameState.coordinateRestrictions.length > 0 ? isRestricted : checker.isMovable;
    return {
        color: checker.color,
        isKing: checker.isKing,
        isSelected,
        isRestricted,
        isSelectable,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        chooseChecker: coordinate => dispatch(chooseChecker(coordinate))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checker);