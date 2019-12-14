//region imports
import React from "react";
import "../style/GameStatus.css";
import { connect } from "react-redux";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
import { capitalize } from "../utils/common";
//endregion

const GameStatus = ({ score }) => {
    return (
        <div className="game-status">
            <h3>Game Status</h3>
            <p>
                {`${capitalize(PLAYER_1_COLOR)}: ${score[PLAYER_1_COLOR]}`}
                {`${capitalize(PLAYER_2_COLOR)}: ${score[PLAYER_2_COLOR]}`}
            </p>
        </div>
    );
};

const mapStateToProps = state => {
    return { score: state.score };
};

export default connect(mapStateToProps)(GameStatus);