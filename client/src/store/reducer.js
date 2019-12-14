//region imports
import { CHOOSE_SPACE, CHOOSE_CHECKER, CHANGE_CONFIG, SKIP_TURN } from "../utils/constants";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";
import {
    getInitialBoardState,
    isValidMove,
    isCheckerAtEnd,
    isJumpPossible,
    getCheckerCoordinatesAbleToJump, getWinner
} from "../utils/gameutils"

//endregion

const initialState = {
    turnNumber: 1,
    winner: null,
    boardState: getInitialBoardState(),
    currentPlayer: PLAYER_1_COLOR,
    chosenCheckerCoordinate: null,
    coordinateRestrictions: [],
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
        case CHANGE_CONFIG:
            return state;
        case SKIP_TURN:
            return state;
        default:
            return state;
    }
};

const chooseSpaceReducer = (state, action) => {
    const isValid = isValidMove(
        state.chosenCheckerCoordinate,
        action.coordinate,
        state.boardState,
        state.currentPlayer,
        state.coordinateRestrictions.length > 0);
    if (isValid === false) {
        return state;
    }
    return handleTurnChange(state, action, isValid);
};

const handleTurnChange = (state, action, isValid) => {
    let boardState = Array.from(state.boardState);

    const checker = Object.assign({}, boardState[state.chosenCheckerCoordinate[1]][state.chosenCheckerCoordinate[0]]);
    if (isCheckerAtEnd(action.coordinate, state.currentPlayer)) {
        checker.isKing = true;
    }
    boardState[state.chosenCheckerCoordinate[1]][state.chosenCheckerCoordinate[0]] = null;
    boardState[action.coordinate[1]][action.coordinate[0]] = checker;

    let incrementTurn = true;
    let nextPlayer = state.currentPlayer;
    let coordinateRestrictions = [];
    let chosenCheckerCoordinate = action.coordinate;
    let turnNumber = state.turnNumber;
    let score = Object.assign({}, state.score);

    if (Array.isArray(isValid)) {
        let points = boardState[isValid[1]][isValid[0]].isKing ? 2 : 1;
        boardState[isValid[1]][isValid[0]] = null;
        score[state.currentPlayer] += points;
        incrementTurn = !isJumpPossible(action.coordinate, boardState, state.currentPlayer);
        if (!incrementTurn) {
            coordinateRestrictions = [action.coordinate];
        }
    }

    if (incrementTurn) {
        nextPlayer = state.currentPlayer === PLAYER_1_COLOR ? PLAYER_2_COLOR : PLAYER_1_COLOR;
        coordinateRestrictions = getCheckerCoordinatesAbleToJump(boardState, nextPlayer);
        chosenCheckerCoordinate = coordinateRestrictions.length === 0 ? null : Array.from(coordinateRestrictions[0]);
        turnNumber++;
    }

    const winner = getWinner(boardState);
    return Object.assign({}, state, {
        currentPlayer: nextPlayer,
        turnNumber,
        chosenCheckerCoordinate,
        coordinateRestrictions,
        boardState,
        score,
        winner
    });
};

const chooseCheckerReducer = (state, action) => {
    return Object.assign({}, state, {
        chosenCheckerCoordinate: action.coordinate
    });
};

export default rootReducer;