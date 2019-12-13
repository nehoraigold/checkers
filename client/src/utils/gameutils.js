//region imports
import {
    NUMBER_OF_ROWS,
    NUMBER_OF_COLUMNS,
    PLAYER_1_COLOR,
    PLAYER_2_COLOR,
    BOARD_ROW_0_OFFSET,
    PLAYER_1_DIRECTION, PLAYER_2_DIRECTION
} from "./constants";

//endregion

//region exported functions
export function initializeBoard() {
    const createRow = (color, offset) =>
        Array(NUMBER_OF_COLUMNS)
            .fill(undefined)
            .map((el, i) => color === null ? null : (i + BOARD_ROW_0_OFFSET + offset) % 2 === 0 ? {color, isKing: false} : null);

    return Array(NUMBER_OF_ROWS)
        .fill(undefined)
        .map((el, i) => createRow(i < 3 ? PLAYER_1_COLOR : i > 4 ? PLAYER_2_COLOR : null, i));
}

export function isValidMove(checkerCoordinate, spaceCoordinate, board, player) {
    if (!isValidSpace(spaceCoordinate, board)) {
        return false;
    }
    const playerDirection = getPlayerDirection(player);
    if (!isCheckerKing(checkerCoordinate, board) && !isForwardMove(checkerCoordinate, spaceCoordinate, playerDirection)) {
        return false;
    }
    if (isInImmediateVicinity(checkerCoordinate, spaceCoordinate)) {
        return true;
    }
    const enemyChecker = skipsOverEnemyChecker(checkerCoordinate, spaceCoordinate, board, player);
    if (enemyChecker && enemyChecker.length > 0) {
        console.log("Enemy checker:", enemyChecker);
        return enemyChecker;
    }
    return false;
}

export function hasReachedEnd(checkerCoordinate, player) {
    return checkerCoordinate[1] === (player === PLAYER_1_COLOR ? NUMBER_OF_ROWS - 1 : 0);
}

export function isJumpPossible(checkerCoordinate, board, player) {
    console.log("BOARD FROM ISJUMPPOSSIBLE", board);
    const direction = getPlayerDirection(player);
    const x = checkerCoordinate[0];
    const y = checkerCoordinate[1];
    const possibleSpaces = [
        [x + 2, y + 2],
        [x + 2, y - 2],
        [x - 2, y - 2],
        [x - 2, y + 2]
    ];
    const anySkips = possibleSpaces.map(spaceCoordinate => {
        console.log(spaceCoordinate);
        if (!isValidSpace(spaceCoordinate, board) ||
            (!isCheckerKing(checkerCoordinate, board) &&
            !isForwardMove(checkerCoordinate, spaceCoordinate, direction))) {
            return false;
        }
        return skipsOverEnemyChecker(checkerCoordinate, spaceCoordinate, board, player).length !== 0;
    });
    console.log(anySkips);
    return anySkips.some(el => el === true);
}
//endregion

//region private functions
function isCheckerKing(checkerCoordinate, board) {
    return board[checkerCoordinate[1]][checkerCoordinate[0]].isKing;
}

function isForwardMove(checkerCoordinate, spaceCoordinate, direction) {
    return Math.sign(checkerCoordinate[1] - spaceCoordinate[1]) === Math.sign(direction);
}

function getPlayerDirection(player) {
    return  player === PLAYER_1_COLOR ? PLAYER_1_DIRECTION : PLAYER_2_DIRECTION;
}

function isInImmediateVicinity(checkerCoordinate, spaceCoordinate) {
    const xValue = checkerCoordinate[0];
    const yValue = checkerCoordinate[1];
    return (spaceCoordinate[0] === xValue + 1 || spaceCoordinate[0] === xValue - 1)
        && (spaceCoordinate[1] === yValue + 1 || spaceCoordinate[1] === yValue - 1);
}

function skipsOverEnemyChecker(checkerCoordinate, spaceCoordinate, board, playerColor) {
    const enemyCheckerX = checkerCoordinate[0] + (spaceCoordinate[0] - checkerCoordinate[0]) / 2;
    const enemyCheckerY = checkerCoordinate[1] + (spaceCoordinate[1] - checkerCoordinate[1]) / 2;
    if (enemyCheckerX % 1 !== 0 || enemyCheckerY % 1 !== 0) {
        return [];
    }
    const enemyCheckerLocation = board[enemyCheckerY][enemyCheckerX];
    if (enemyCheckerLocation && enemyCheckerLocation !== playerColor) {
        return [enemyCheckerX, enemyCheckerY];
    }
    return [];
}

function isValidSpace(spaceCoordinate, board) {
    console.log("IS", spaceCoordinate, "WITHIN BOUNDS", !isOutOfBounds(spaceCoordinate))
    return !isOutOfBounds(spaceCoordinate)
        && isSpaceFree(spaceCoordinate, board)
        && isRightColoredSpace(spaceCoordinate);
}

function isRightColoredSpace(spaceCoordinate) {
    return (spaceCoordinate[1] + BOARD_ROW_0_OFFSET + spaceCoordinate[0]) % 2 === 0;
}

function isOutOfBounds(coordinate) {
    return coordinate[0] < 0 || coordinate[0] >= NUMBER_OF_COLUMNS || coordinate[1] < 0 || coordinate[1] >= NUMBER_OF_ROWS;
}

function isSpaceFree(spaceCoordinate, board) {
    return board[spaceCoordinate[1]][spaceCoordinate[0]] === null;
}
//endregion