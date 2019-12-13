//region imports
import React from "react";
import "./style/Checker.css";
import { chooseChecker } from "../actions/gameActions"
import { connect } from "react-redux";
//endregion

const Checker = ({ color, coordinate, chooseChecker, isCheckerSelectable, isCheckerSelected }) => {
    const onCheckerClick = () => {
        if (isCheckerSelectable) {
            chooseChecker(coordinate);
        }
    };

    return <div className={`checker ${color} ${isCheckerSelected ? "selected" : ""}`} onClick={onCheckerClick}/>
};

const mapStateToProps = (state, ownProps) => {
    return {
        isCheckerSelectable: state.currentPlayer === ownProps.color,
        isCheckerSelected: state.chosenCheckerCoordinate !== null && state.chosenCheckerCoordinate === ownProps.coordinate
    }
};

const mapDispatchToProps = dispatch => {
    return {
        chooseChecker: coordinate => dispatch(chooseChecker(coordinate))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checker);