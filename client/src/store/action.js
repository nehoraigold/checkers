//region imports
import { CHOOSE_CHECKER, CHOOSE_SPACE } from "../utils/constants"
//endregion

export const chooseChecker = (coordinate) => {
    return { type: CHOOSE_CHECKER, coordinate };
};

export const chooseSpace = (coordinate) => {
    return { type: CHOOSE_SPACE, coordinate };
};