//region imports
import React from "react";
import "../style/GameStatus.css";
import Checker from "./checker";
import { connect } from "react-redux";
import { changeConfig, restartGame } from "../store/actions";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
import { Button, Switch } from "antd";
import "antd/dist/antd.css";
//endregion

const GameStatus = ({ score, winner, restart, restrictionsOn, toggleRestrictions }) => {
    const changeRestrictions = () => toggleRestrictions(restrictionsOn);
    return (
        <div className="game-status">
            <h3>Checkers</h3>
            <div className="score-box">
                <div className="score"><Checker isToken={true} color={PLAYER_1_COLOR}/> {score[PLAYER_1_COLOR]}</div>
                <div className="score"><Checker isToken={true} color={PLAYER_2_COLOR}/> {score[PLAYER_2_COLOR]}</div>
            </div>
            <Switch checked={restrictionsOn} onClick={changeRestrictions}/>
            <Button className="restart-button" type="primary" onClick={restart}>
                <b>{winner ? "Play Again" : "Restart"}</b>
            </Button>
        </div>
    );
};

const mapStateToProps = ({ gameState, configs }) => {
    return {
        score: gameState.score,
        winner: gameState.winner,
        restrictionsOn: configs.restricted
    };
};

const mapDispatchToProps = dispatch => {
    return {
        restart: () => dispatch(restartGame()),
        toggleRestrictions: (isRestricted) => dispatch(changeConfig({ restricted: !isRestricted }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);