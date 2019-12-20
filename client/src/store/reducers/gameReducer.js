//region imports
import { CHOOSE_SPACE, CHOOSE_CHECKER, RESTART_GAME, CHANGE_CONFIG } from "../../utils/constants";
import { PLAYER_1_COLOR, PLAYER_2_COLOR } from "../../utils/constants";
import {
    getInitialBoardState,
    isValidMove,
    isCheckerAtEnd,
    isJumpPossible,
    getCheckerCoordinatesAbleToJump, getWinner, setMovableCheckers
} from "../../utils/gameutils"

//endregion

export const getInitialGameState = () => {
    return {
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
};

export const gameReducer = ({ gameState, configs }, action) => {
    switch (action.type) {
        case CHOOSE_SPACE:
            return chooseSpaceReducer({ gameState, configs }, action);
        case CHOOSE_CHECKER:
            return chooseCheckerReducer(gameState, action);
        case RESTART_GAME:
            return Object.assign({}, getInitialGameState(), { boardState: getInitialBoardState() });
        default:
            return gameState;
    }
};

const chooseCheckerReducer = (gameState, action) => {
    return Object.assign({}, gameState, {
        chosenCheckerCoordinate: action.coordinate
    });
};

const chooseSpaceReducer = ({ gameState, configs }, action) => {
    const isValid = isValidMove(
        gameState.chosenCheckerCoordinate,
        action.coordinate,
        gameState.boardState,
        gameState.currentPlayer,
        configs.restricted && gameState.coordinateRestrictions.length > 0);
    if (isValid === false) {
        return gameState;
    }
    return handleTurnChange({ gameState, configs }, action, isValid);
};

const handleTurnChange = ({ gameState, configs }, action, isValid) => {
    let boardState = Array.from(gameState.boardState)
        .map(row => row.map(checker =>
            checker === null ? null : { color: checker.color, isKing: checker.isKing, isMovable: false }));

    const checker = Object.assign({}, boardState[gameState.chosenCheckerCoordinate[1]][gameState.chosenCheckerCoordinate[0]]);
    if (isCheckerAtEnd(action.coordinate, gameState.currentPlayer)) {
        checker.isKing = true;
    }
    boardState[gameState.chosenCheckerCoordinate[1]][gameState.chosenCheckerCoordinate[0]] = null;
    boardState[action.coordinate[1]][action.coordinate[0]] = checker;

    let incrementTurn = true;
    let nextPlayer = gameState.currentPlayer;
    let coordinateRestrictions = [];
    let chosenCheckerCoordinate = action.coordinate;
    let turnNumber = gameState.turnNumber;
    let score = Object.assign({}, gameState.score);

    if (Array.isArray(isValid)) {
        let points = boardState[isValid[1]][isValid[0]].isKing ? 2 : 1;
        boardState[isValid[1]][isValid[0]] = null;
        score[gameState.currentPlayer] += points;
        incrementTurn = !isJumpPossible(action.coordinate, boardState, gameState.currentPlayer);
        if (!incrementTurn) {
            coordinateRestrictions = [action.coordinate];
        }
    }

    if (incrementTurn) {
        nextPlayer = gameState.currentPlayer === PLAYER_1_COLOR ? PLAYER_2_COLOR : PLAYER_1_COLOR;
        coordinateRestrictions = getCheckerCoordinatesAbleToJump(boardState, nextPlayer);
        chosenCheckerCoordinate = coordinateRestrictions.length === 0 ? null : Array.from(coordinateRestrictions[0]);
        turnNumber++;
    }
    setMovableCheckers(boardState, nextPlayer);
    const winner = getWinner(boardState);
    return Object.assign({}, gameState, {
        currentPlayer: nextPlayer,
        turnNumber,
        chosenCheckerCoordinate,
        coordinateRestrictions,
        boardState,
        score,
        winner
    });
};

export default gameReducer;