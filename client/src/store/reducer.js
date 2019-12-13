//region imports
import { CHOOSE_SPACE, CHOOSE_CHECKER } from "../utils/constants";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
import { initializeBoard, isValidMove, hasReachedEnd, isJumpPossible } from "../utils/gameutils"

//endregion

const initialState = {
    turnNumber: 1,
    boardState: initializeBoard(),
    currentPlayer: PLAYER_1_COLOR,
    chosenCheckerCoordinate: null,
    score: {
        [PLAYER_1_COLOR]: 0,
        [PLAYER_2_COLOR]: 0
    }
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
    let boardState = Array.from(state.boardState);
    const checker = Object.assign({}, boardState[state.chosenCheckerCoordinate[1]][state.chosenCheckerCoordinate[0]]);
    if (hasReachedEnd(action.coordinate, state.currentPlayer)) {
        checker.isKing = true;
    }
    boardState[state.chosenCheckerCoordinate[1]][state.chosenCheckerCoordinate[0]] = null;
    boardState[action.coordinate[1]][action.coordinate[0]] = checker;
    let incrementTurn = true;
    let score = Object.assign({}, state.score);
    if (Array.isArray(isValid)) {
        boardState[isValid[1]][isValid[0]] = null;
        score[state.currentPlayer]++;
        incrementTurn = !isJumpPossible(action.coordinate, boardState, state.currentPlayer)
    }
    return Object.assign({}, state, {
        turnNumber: incrementTurn ? state.turnNumber + 1 : state.turnNumber,
        currentPlayer: incrementTurn ?
            (state.currentPlayer === PLAYER_1_COLOR ? PLAYER_2_COLOR : PLAYER_1_COLOR)
            : state.currentPlayer,
        chosenCheckerCoordinate: incrementTurn ? null : action.coordinate,
        boardState,
        score
    });
};

const chooseCheckerReducer = (state, action) => {
    return Object.assign({}, state, {
        chosenCheckerCoordinate: action.coordinate
    });
};

export default rootReducer;