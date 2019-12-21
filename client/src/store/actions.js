//region imports
import {
    TOGGLE_FORCE_JUMP,
    CHOOSE_CHECKER,
    CHOOSE_SPACE,
    SKIP_TURN,
    RESTART_GAME,
    CHANGE_PLAYER_COLOR
} from "../utils/constants"
//endregion

export const chooseChecker = (coordinate) => {
    return { type: CHOOSE_CHECKER, coordinate };
};

export const chooseSpace = (coordinate) => {
    return { type: CHOOSE_SPACE, coordinate };
};

export const toggleForceJump = () => {
    return { type: TOGGLE_FORCE_JUMP };
};

export const changePlayerColor = (player, newColor) => {
    return { type: CHANGE_PLAYER_COLOR, player, newColor }
}

export const skipTurn = () => {
    return { type: SKIP_TURN };
};

export const restartGame = () => {
    return { type: RESTART_GAME };
};