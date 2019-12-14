//region imports
import { CHANGE_CONFIG, CHOOSE_CHECKER, CHOOSE_SPACE, SKIP_TURN, RESTART_GAME } from "../utils/constants"
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

export const skipTurn = () => {
    return { type: SKIP_TURN };
};

export const restartGame = () => {
    return { type: RESTART_GAME };
};