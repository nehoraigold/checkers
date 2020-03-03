//region imports
import React from "react";
import { DragSource, useDrag } from "react-dnd";
import "../style/Checker.css";
import CrownIcon from "./CrownIcon";
import { chooseChecker } from "../store/actions"
import { connect } from "react-redux";
import { COMPLEMENTARY_COLORS, DRAGGABLE_ITEM_TYPE } from "../utils/constants";
//endregion

const Checker = ({ color, isKing, chooseChecker, isSelectable, isSelected, canJump, isToken }) => {
    const onCheckerClick = () => isSelectable ? chooseChecker() : null;
    const [{ isDragging }, drag] = useDrag({
        item: { type: DRAGGABLE_ITEM_TYPE.CHECKER },
        collect: monitor => !!monitor.isDragging(),
        begin: onCheckerClick
    });

    return (
        <div ref={drag}
             className={`checker ${color} 
                    ${isToken ? "token" : ""}
                    ${isSelected ? "selected" : ""}
                    ${canJump ? "forceJump" : ""}
                    ${isSelectable ? "selectable" : ""}
                    ${isDragging ? "dragging" : ""}`}
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
    const canJump = gameState.forceJumpCheckerCoordinates.some(coordinate =>
        coordinate[0] === ownProps.coordinate[0] && coordinate[1] === ownProps.coordinate[1]);
    const isSelectable = configs.forceJump && gameState.forceJumpCheckerCoordinates.length > 0 ? canJump : checker.isMovable;
    const isSelected = !isSelectable ? false : gameState.chosenCheckerCoordinate !== null
        && gameState.chosenCheckerCoordinate[0] === ownProps.coordinate[0]
        && gameState.chosenCheckerCoordinate[1] === ownProps.coordinate[1];
    return {
        color: configs.playerColors[checker.player],
        isKing: checker.isKing,
        isSelected,
        canJump,
        isSelectable,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        chooseChecker: () => dispatch(chooseChecker(ownProps.coordinate))
    }
};

export default DragSource(DRAGGABLE_ITEM_TYPE.CHECKER,
    {
        beginDrag: () => {},
        endDrag: () => {}
    },
    (connect, monitor) => ({
        isDragging: monitor.isDragging(),
    }))(connect(mapStateToProps, mapDispatchToProps)(Checker));