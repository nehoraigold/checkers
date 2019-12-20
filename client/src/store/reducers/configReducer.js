//region imports
import { CHANGE_CONFIG, PLAYER_COLORS } from "../../utils/constants";
//endregion

export const getInitialConfigState = () => {
    return {
        restricted: true,
        playerColors: ["white", "black"],
        possiblePlayerColors: PLAYER_COLORS
    };
};

const configReducer = (configState, action) => {
    switch (action.type) {
        case CHANGE_CONFIG:
            return Object.assign({}, configState, action.config);
        default:
            return configState;
    }
};

export default configReducer;