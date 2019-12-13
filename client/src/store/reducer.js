//region imports
import { CHOOSE_SPACE, CHOOSE_CHECKER } from "../utils/constants";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
import { initializeBoard, isValidMove } from "../utils/gameutils"

//endregion

const initialState = {
    turnNumber: 1,
    boardState: initializeBoard(),
    currentPlayer: PLAYER_1_COLOR,
    chosenCheckerCoordinate: null
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHOOSE_SPACE:
            return chooseSpaceReducer(state, action);
        case CHOOSE_CHECKER:
            return chooseCheckerReducer(state, action);
        default:
            return state;
    }
};

const chooseSpaceReducer = (state, action) => {
    const isValid = isValidMove(state.chosenCheckerCoordinate, action.coordinate, state.boardState, state.currentPlayer);
    if (isValid === false) {
        return state;
    }
    let newBoard = Array.from(state.boardState);
    newBoard[state.chosenCheckerCoordinate[1]][state.chosenCheckerCoordinate[0]] = null;
    newBoard[action.coordinate[1]][action.coordinate[0]] = state.currentPlayer;
    let incrementTurn = true;
    if (Array.isArray(isValid)) {
        newBoard[isValid[1]][isValid[0]] = null;
        incrementTurn = false;
    }
    return {
        turnNumber: incrementTurn ? state.turnNumber + 1 : state.turnNumber,
        currentPlayer: incrementTurn ?
            (state.currentPlayer === PLAYER_1_COLOR ? PLAYER_2_COLOR : PLAYER_1_COLOR)
            : state.currentPlayer,
        chosenCheckerCoordinate: incrementTurn ? null : action.coordinate,
        boardState: newBoard
    };
};

const chooseCheckerReducer = (state, action) => {
    return Object.assign({}, state, {
        chosenCheckerCoordinate: action.coordinate
    });
};

export default rootReducer;