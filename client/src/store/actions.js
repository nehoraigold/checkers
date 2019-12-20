//region imports
import {
    CHANGE_CONFIG,
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

export const changeConfig = (config) => {
    return { type: CHANGE_CONFIG, config };
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