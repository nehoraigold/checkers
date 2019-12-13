//region imports
import { END_OF_PLAYER_TURN, CHOOSE_SPACE, CHOOSE_CHECKER } from "../actions/actionTypes"

//endregion

const createInitialBoard = () => {
    const NUMBER_OF_ROWS = 8;
    const NUMBER_OF_COLUMNS = 8;
    const createRow = (color, offset) => {
        return Array(NUMBER_OF_COLUMNS).fill(undefined).map((el, i) => (i + 1 + offset) % 2 === 0 ? color : null);
    };
    return Array(NUMBER_OF_ROWS).fill(undefined).map((el, i) => {
        let color = null;
        if (i < 3) {
            color = "white";
        } else if (i > 4) {
            color = "black";
        }
        return createRow(color, i);
    });
};

const initialState = {
    turnNumber: 1,
    boardState: createInitialBoard(),
    currentPlayer: "white",
    chosenCheckerCoordinate: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHOOSE_SPACE:
            break;
        case CHOOSE_CHECKER:
            return chooseCheckerReducer(state, action);
        case END_OF_PLAYER_TURN:
            return changePlayerTurnReducer(state);
        default:
            break;
    }
    return state;
};

const chooseCheckerReducer = (state, action) => {
    return Object.assign({}, state, {
        chosenCheckerCoordinate: action.coordinate
    });
};

const changePlayerTurnReducer = state => {
    return Object.assign({}, state, {
        turnNumber: state.turnNumber + 1,
        currentPlayer: state.currentPlayer === "white" ? "black" : "white",
        chosenCheckerCoordinate: null
    });
};

export default rootReducer;