//region imports
import { TOGGLE_FORCE_JUMP, CHANGE_PLAYER_COLOR } from "../../utils/constants";
//endregion

export const getInitialConfigState = () => {
    return {
        forceJump: true,
        playerColors: ["white", "black"],
    };
};

const configReducer = (configState, action) => {
    switch (action.type) {
        case TOGGLE_FORCE_JUMP:
            return Object.assign({}, configState, { forceJump: !configState.forceJump });
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