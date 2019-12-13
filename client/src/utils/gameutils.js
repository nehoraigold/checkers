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
    if (!isCheckerKing(checkerCoordinate, board) &&
        !isForwardMove(checkerCoordinate, spaceCoordinate, getPlayerDirection(player))) {
        return false;
    }
    if (isInImmediateVicinity(checkerCoordinate, spaceCoordinate)) {
        return true;
    }
    const enemyChecker = skipsOverEnemyChecker(checkerCoordinate, spaceCoordinate, board, player);
    if (enemyChecker && enemyChecker.length > 0) {
        return enemyChecker;
    }
    return false;
}

export function hasReachedEnd(checkerCoordinate, player) {
    return checkerCoordinate[1] === (player === PLAYER_1_COLOR ? NUMBER_OF_ROWS - 1 : 0);
}

export function isJumpPossible(checkerCoordinate, board, player) {
    return getPossibleJumpSpaces(checkerCoordinate).some(spaceCoordinate => {
            if (!isValidSpace(spaceCoordinate, board) ||
                (!isCheckerKing(checkerCoordinate, board) &&
                !isForwardMove(checkerCoordinate, spaceCoordinate, getPlayerDirection(player)))) {
                return false;
            }
            return skipsOverEnemyChecker(checkerCoordinate, spaceCoordinate, board, player).length !== 0;
        });
}

export function getCheckerCoordinatesAbleToJump(board, player) {
    const checkersAbleToJump = [];
    board.forEach((row, y) => {
        row.forEach((checker, x) => {
            if (checker !== null && checker.color === player &&
                isJumpPossible([x, y], board, player)) {
                checkersAbleToJump.push([x, y]);
            }
        });
    });
    console.log(checkersAbleToJump);
    return checkersAbleToJump;
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

function getPossibleJumpSpaces(coordinate) {
    const x = coordinate[0];
    const y = coordinate[1];
    return [
        [x + 2, y + 2],
        [x + 2, y - 2],
        [x - 2, y - 2],
        [x - 2, y + 2]
    ];
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
    const skippedChecker = board[enemyCheckerY][enemyCheckerX];
    if (skippedChecker && skippedChecker.color !== playerColor) {
        console.log(skippedChecker.color, "enemy checker", [enemyCheckerX, enemyCheckerY]);
        return [enemyCheckerX, enemyCheckerY];
    }
    return [];
}

function isValidSpace(spaceCoordinate, board) {
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