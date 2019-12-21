//region imports
import {
    CHOOSE_SPACE,
    CHOOSE_CHECKER,
    RESTART_GAME,
    PLAYER_ONE,
    PLAYER_TWO,
    TOGGLE_FORCE_JUMP
} from "../../utils/constants";
import {
    getInitialBoardState, isValidMove, isCheckerAtEnd, isJumpPossible,
    getCheckerCoordinatesAbleToJump, getWinner, setMovableCheckers, getAllPossibleMoves
} from "../../utils/gameutils"

//endregion

export const getInitialGameState = () => {
    return {
        turnNumber: 1,
        winner: null,
        boardState: getInitialBoardState(),
        currentPlayer: PLAYER_ONE,
        chosenCheckerCoordinate: null,
        forceJumpCheckerCoordinates: [],
        possibleMoveCoordinates: [],
        score: {
            [PLAYER_ONE]: 0,
            [PLAYER_TWO]: 0
        }
    };
};

export const gameReducer = ({ gameState, configs }, action) => {
    switch (action.type) {
        case CHOOSE_SPACE:
            return chooseSpaceReducer({ gameState, configs }, action);
        case CHOOSE_CHECKER:
            return chooseCheckerReducer({ gameState, configs }, action);
        case TOGGLE_FORCE_JUMP:
            return toggleForceJumpReducer({ gameState, configs });
        case RESTART_GAME:
            return Object.assign({}, getInitialGameState(), { boardState: getInitialBoardState() });
        default:
            return gameState;
    }
};

const toggleForceJumpReducer = ({ gameState, configs }) => {
    const { chosenCheckerCoordinate, boardState, forceJumpCheckerCoordinates, currentPlayer } = gameState;
    const forceJump = !configs.forceJump; // toggled
    const forceJumpPossible = forceJumpCheckerCoordinates.length > 0;
    if (chosenCheckerCoordinate === null || !forceJumpPossible) {
        return gameState;
    }
    let newCheckerCoordinate = chosenCheckerCoordinate;
    if (forceJump) {
        newCheckerCoordinate = isJumpPossible(chosenCheckerCoordinate, boardState, currentPlayer) ? chosenCheckerCoordinate : null;
    }
    const possibleMoveCoordinates = newCheckerCoordinate ? getAllPossibleMoves(newCheckerCoordinate, boardState, forceJump && forceJumpPossible) : [];
    return Object.assign({}, gameState, { chosenCheckerCoordinate: newCheckerCoordinate, possibleMoveCoordinates });
};

const chooseCheckerReducer = ({ gameState, configs }, action) => {
    const forceJump = forceJumpRelevant(gameState, configs);
    return Object.assign({}, gameState, {
        chosenCheckerCoordinate: action.coordinate,
        possibleMoveCoordinates: getAllPossibleMoves(action.coordinate, gameState.boardState, forceJump)
    });
};

const chooseSpaceReducer = ({ gameState, configs }, action) => {
    const isValid = isValidMove(
        gameState.chosenCheckerCoordinate,
        action.coordinate,
        gameState.boardState,
        gameState.currentPlayer,
        forceJumpRelevant(gameState, configs));
    if (isValid === false) {
        return gameState;
    }
    return handleTurnChange({ gameState, configs }, action, isValid);
};

const handleTurnChange = ({ gameState, configs }, action, isValid) => {
    let boardState = Array.from(gameState.boardState)
        .map(row => row.map(checker =>
            checker === null ? null : { player: checker.player, isKing: checker.isKing, isMovable: false }));

    const checker = Object.assign({}, boardState[gameState.chosenCheckerCoordinate[1]][gameState.chosenCheckerCoordinate[0]]);
    if (isCheckerAtEnd(action.coordinate, gameState.currentPlayer)) {
        checker.isKing = true;
    }
    boardState[gameState.chosenCheckerCoordinate[1]][gameState.chosenCheckerCoordinate[0]] = null;
    boardState[action.coordinate[1]][action.coordinate[0]] = checker;

    let incrementTurn = true;
    let nextPlayer = gameState.currentPlayer;
    let forceJumpCheckerCoordinates = [];
    let chosenCheckerCoordinate = action.coordinate;
    let turnNumber = gameState.turnNumber;
    let score = Object.assign({}, gameState.score);

    if (Array.isArray(isValid)) {
        let points = boardState[isValid[1]][isValid[0]].isKing ? 2 : 1;
        boardState[isValid[1]][isValid[0]] = null;
        score[gameState.currentPlayer] += points;
        incrementTurn = !isJumpPossible(action.coordinate, boardState, gameState.currentPlayer);
        if (!incrementTurn) {
            forceJumpCheckerCoordinates = [action.coordinate];
        }
    }

    if (incrementTurn) {
        nextPlayer = gameState.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
        forceJumpCheckerCoordinates = getCheckerCoordinatesAbleToJump(boardState, nextPlayer);
        chosenCheckerCoordinate = forceJumpCheckerCoordinates.length === 0 ? null : Array.from(forceJumpCheckerCoordinates[0]);
        turnNumber++;
    }
    setMovableCheckers(boardState, nextPlayer);
    const possibleMoveCoordinates = chosenCheckerCoordinate === null ? [] : getAllPossibleMoves(chosenCheckerCoordinate, boardState, configs.forceJump);
    const winner = getWinner(boardState);
    return Object.assign({}, gameState, {
        currentPlayer: nextPlayer,
        turnNumber,
        chosenCheckerCoordinate,
        forceJumpCheckerCoordinates,
        possibleMoveCoordinates,
        boardState,
        score,
        winner
    });
};

const forceJumpRelevant = (gameState, configs) => {
    return configs.forceJump && gameState.forceJumpCheckerCoordinates.length > 0;
}

export default gameReducer;