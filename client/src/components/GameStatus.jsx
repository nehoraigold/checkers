//region imports
import React from "react";
import "../style/GameStatus.css";
import { connect } from "react-redux";
import { restartGame } from "../store/action";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
import { capitalize } from "../utils/common";
//endregion

const GameStatus = ({ score, winner, restart }) => {
    return (
        <div className="game-status">
            <h3>Game Status</h3>
            <p>
                {`${capitalize(PLAYER_1_COLOR)}: ${score[PLAYER_1_COLOR]}`}
                {`${capitalize(PLAYER_2_COLOR)}: ${score[PLAYER_2_COLOR]}`}
            </p>
            <button onClick={restart}>{winner ? "Play Again" : "Restart"}</button>
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