//region imports
import { END_OF_PLAYER_TURN, CHOOSE_CHECKER, CHOOSE_SPACE } from "./actionTypes"
//endregion

export const chooseChecker = (coordinate) => {
    return { type: CHOOSE_CHECKER, coordinate };
};

export const chooseSpace = (coordinate) => {
    return { type: CHOOSE_SPACE, coordinate };
};

export const changePlayerTurn = () => {
    return { type: END_OF_PLAYER_TURN };
};