//region imports
import React from "react";
import "../style/GameStatus.css";
import Checker from "./Checker";
import { connect } from "react-redux";
import { changeConfig, restartGame } from "../store/actions";
import { PLAYER_ONE, PLAYER_TWO } from "../utils/constants";
import { Button, Switch } from "antd";
import "antd/dist/antd.css";
//endregion

const GameStatus = ({ score, playerColors, winner, restart, restrictionsOn, toggleRestrictions, toggleCheckerColor }) => {
    const changeRestrictions = () => toggleRestrictions(restrictionsOn);
    const changeCheckerColor = (player) => toggleCheckerColor(player);
    return (
        <div className="game-status">
            <h3>Checkers</h3>
            <div className="score-box">
                {[PLAYER_ONE, PLAYER_TWO].map(player =>
                <div className="score" key={player}>
                    <Checker isToken={true} color={playerColors[player]}/> {score[player]}
                </div>)}
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
        playerColors: configs.playerColors,
        restrictionsOn: configs.restricted
    };
};

const mapDispatchToProps = dispatch => {
    return {
        restart: () => dispatch(restartGame()),
        toggleRestrictions: (restricted) => dispatch(changeConfig({ restricted: !restricted })),
        toggleCheckerColor: (player) => {

        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);