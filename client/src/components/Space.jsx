//region imports
import React from "react";
import "../style/Space.css";
import Checker from "./Checker";
import { connect } from "react-redux";
import { chooseSpace } from "../store/action";
//endregion

const Space = ({ color, coordinate, checker, canSelectSpace, selectSpace }) => {
    const onSpaceClick = () => {
        if (canSelectSpace) {
            selectSpace(coordinate);
        }
    };

    return (
        <div className={`space ${color}`} onClick={onSpaceClick}>
            {checker ? <Checker color={checker} coordinate={coordinate}/> : null}
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return { selectSpace: coordinate => dispatch(chooseSpace(coordinate)) };
};


const mapStateToProps = (state, ownProps) => {
    return {
        checker: state.boardState[ownProps.coordinate[1]][ownProps.coordinate[0]],
        canSelectSpace: state.chosenCheckerCoordinate !== null
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Space);