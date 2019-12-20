//region imports
import configReducer, { getInitialConfigState } from "./configReducer";
import gameReducer, { getInitialGameState } from "./gameReducer"

//endregion

const initialState = { gameState: getInitialGameState(), configs: getInitialConfigState() };

const rootReducer = (state = initialState, action) => {
    return {
        gameState: gameReducer(state, action),
        configs: configReducer(state.configs, action)
    }
};

export default rootReducer;