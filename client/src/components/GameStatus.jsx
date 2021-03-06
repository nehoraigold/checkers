//region imports
import React from "react";
import "../style/GameStatus.css";
import { connect } from "react-redux";
import { toggleForceJump, restartGame, changePlayerColor } from "../store/actions";
import { PLAYER_ONE, PLAYER_TWO, ALL_PLAYER_COLORS } from "../utils/constants";
import { Button, Switch, Select } from "antd";
const { Option } = Select;
import "antd/dist/antd.css";
import Checker from "./Checker";
//endregion

const GameStatus = ({ score, playerColors, winner, restart, restrictionsOn, toggleRestrictions, changeCheckerColor }) => {
    const changeRestrictions = () => toggleRestrictions(restrictionsOn);
    const onCheckerColorChange = (player, color) => changeCheckerColor(player, color);
    return (
        <div className="game-status">
            <div className="score-box">
                {[PLAYER_ONE, PLAYER_TWO].map(player =>
                <div className="score" key={player}>
                    <Select defaultValue={playerColors[player]}
                            onChange={color => onCheckerColorChange(player, color)}
                            showArrow={false}
                            size={"large"}
                            className={"color-dropdown"}
                    >
                        {ALL_PLAYER_COLORS.map(color =>
                            <Option key={color} value={color}
                                    disabled={playerColors.some(playerColor => color === playerColor)}>
                                <Checker isToken={true} color={color}/>
                            </Option>)}
                    </Select> {score[player]}
                </div>)}
            </div>
            <div className="options-box">
                <div className="forcejump-box">
                    Force Jump <Switch checked={restrictionsOn} onClick={changeRestrictions}/>
                </div>
                <Button className="restart-button" type="primary" onClick={restart}>
                    <b>{winner ? "Play Again" : "Restart"}</b>
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = ({ gameState, configs }) => {
    return {
        score: gameState.score,
        winner: gameState.winner,
        playerColors: configs.playerColors,
        restrictionsOn: configs.forceJump
    };
};

const mapDispatchToProps = dispatch => {
    return {
        restart: () => dispatch(restartGame()),
        toggleRestrictions: (restricted) => dispatch(toggleForceJump()),
        changeCheckerColor: (player, color) => dispatch(changePlayerColor(player, color))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameStatus);