//region imports
import React from "react";
import "../style/GameStatus.css";
import { connect } from "react-redux";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
//endregion

const GameStatus = ({ score }) => {
    return (
        <div className="game-status">
            <h3>Game Status</h3>
            <p>
                {`${PLAYER_1_COLOR}: ${score[PLAYER_1_COLOR]}`}
                <br/>
                {`${PLAYER_2_COLOR}: ${score[PLAYER_2_COLOR]}`}
            </p>
        </div>
    );
};

const mapStateToProps = state => {
    return { score: state.score };
};

export default connect(mapStateToProps)(GameStatus);