//region imports
import { CHANGE_CONFIG, CHANGE_PLAYER_COLOR } from "../../utils/constants";
//endregion

export const getInitialConfigState = () => {
    return {
        forceJump: true,
        playerColors: ["white", "black"],
    };
};

const configReducer = (configState, action) => {
    switch (action.type) {
        case CHANGE_CONFIG:
            return Object.assign({}, configState, action.config);
        case CHANGE_PLAYER_COLOR:
            return handlePlayerColorChange(configState, action);
        default:
            return configState;
    }
};

const handlePlayerColorChange = (configState, action) => {
    console.log("GOT HERE");
    const newPlayerColors = Array.from(configState.playerColors);
    newPlayerColors[action.player] = action.newColor;
    return Object.assign({}, configState, { playerColors: newPlayerColors });
};

export default configReducer;