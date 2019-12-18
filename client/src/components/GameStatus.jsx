//region imports
import React from "react";
import "../style/GameStatus.css";
import Checker from "./checker";
import { connect } from "react-redux";
import { restartGame } from "../store/action";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
import { Button } from "antd";
import "antd/dist/antd.css";
//endregion

const GameStatus = ({ score, winner, restart }) => {
    return (
        <div className="game-status">
            <h3>Checkers</h3>
            <div className="score-box">
                <div className="score"><Checker isToken={true} color={PLAYER_1_COLOR}/> {score[PLAYER_1_COLOR]}</div>
                <div className="score"><Checker isToken={true} color={PLAYER_2_COLOR}/> {score[PLAYER_2_COLOR]}</div>
            </div>
            <Button className="restart-button" type="primary" onClick={restart}>
                <b>{winner ? "Play Again" : "Restart"}</b>
            </Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        score: state.score,
        winner: state.winner
    };
};

const mapDispatchToProps = dispatch => {
    return {
        restart: () => dispatch(restartGame())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);