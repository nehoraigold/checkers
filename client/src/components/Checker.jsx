//region imports
import React from "react";
import "../style/Checker.css";
import CrownIcon from "./CrownIcon";
import { chooseChecker } from "../store/actions"
import { connect } from "react-redux";
import { COMPLEMENTARY_COLORS } from "../utils/constants";
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
            {isKing ? <CrownIcon color={COMPLEMENTARY_COLORS[color]}/> : null}
        </div>
    );
};

const mapStateToProps = ({ gameState, configs }, ownProps) => {
    if (ownProps.isToken) {
        return {};
    }
    const checker = gameState.boardState[ownProps.coordinate[1]][ownProps.coordinate[0]];
    const isRestricted = gameState.coordinateRestrictions.some(coordinate => {
        return coordinate[0] === ownProps.coordinate[0] && coordinate[1] === ownProps.coordinate[1];
    });
    const isSelectable = configs.restricted && gameState.coordinateRestrictions.length > 0 ? isRestricted : checker.isMovable;
    const isSelected = !isSelectable ? false : gameState.chosenCheckerCoordinate !== null
        && gameState.chosenCheckerCoordinate[0] === ownProps.coordinate[0]
        && gameState.chosenCheckerCoordinate[1] === ownProps.coordinate[1];
    return {
        color: configs.playerColors[checker.player],
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