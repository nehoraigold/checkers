//region imports
import {
    NUMBER_OF_ROWS,
    NUMBER_OF_COLUMNS,
    BOARD_ROW_0_OFFSET,
    PLAYER_1_DIRECTION,
    PLAYER_2_DIRECTION,
    PLAYER_ONE,
    PLAYER_TWO
} from "./constants";

//endregion

//region exported functions
export function getInitialBoardState() {
    const createRow = (player, offset) =>
        Array(NUMBER_OF_COLUMNS)
            .fill(undefined)
            .map((el, i) => player === null ? null :
                (i + BOARD_ROW_0_OFFSET + offset) % 2 === 0 ? createDefaultChecker(player) : null);
    const initialBoard = Array(NUMBER_OF_ROWS)
        .fill(undefined)
        .map((el, i) => createRow(i < 3 ? PLAYER_ONE : i > 4 ? PLAYER_TWO : null, i));
    return setMovableCheckers(initialBoard, PLAYER_ONE);
}

export function isValidMove(checkerCoordinate, spaceCoordinate, board, player, hasRestrictions) {
    if (!isValidSpace(spaceCoordinate, board)) {
        return false;
    }
    if (!isCheckerKing(checkerCoordinate, board) &&
        !isForwardMove(checkerCoordinate, spaceCoordinate, getPlayerDirection(player))) {
        return false;
    }
    if (isInImmediateVicinity(checkerCoordinate, spaceCoordinate)) {
        return !hasRestrictions
    }
    const enemyChecker = skipsOverEnemyChecker(checkerCoordinate, spaceCoordinate, board, player);
    if (enemyChecker.length === 0 && hasRestrictions) {
        return false;
    }
    if (enemyChecker && enemyChecker.length > 0) {
        return enemyChecker;
    }
    return false;
}

export function isCheckerAtEnd(checkerCoordinate, player) {
    return checkerCoordinate[1] === (player === PLAYER_ONE ? NUMBER_OF_ROWS - 1 : 0);
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
            if (checker !== null && checker.player === player &&
                isJumpPossible([x, y], board, player)) {
                checkersAbleToJump.push([x, y]);
            }
        });
    });
    return checkersAbleToJump;
}

export function getWinner(board) {
    const stillAlive = { [PLAYER_ONE]: false, [PLAYER_TWO]: false };
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
        for (let j = 0; j < NUMBER_OF_COLUMNS; j++) {
            const checker = board[j][i];
            if (checker !== null) {
                stillAlive[checker.player] = true;
                if (stillAlive[PLAYER_ONE] && stillAlive[PLAYER_TWO]) {
                    return null;
                }
            }
        }
    }
    return stillAlive[PLAYER_ONE] ? PLAYER_ONE : PLAYER_TWO;
}

export function setMovableCheckers(board, currentPlayer) {
    board.forEach((row, y) => {
        row.forEach((checker, x) => {
            if (checker && checker.player === currentPlayer && isCheckerMovable([x, y], board)) {
                checker.isMovable = true;
            }
        });
    });
    return board;
}

//endregion

//region private functions
function isCheckerMovable(coordinate, board) {
    const player = board[coordinate[1]][coordinate[0]].player;
    const potentialMoveSpaces = getAllImmediateMoveSpaces(coordinate).concat(getPossibleJumpSpaces(coordinate));
    return potentialMoveSpaces.some(space => isValidMove(coordinate, space, board, player, false));
}

function createDefaultChecker(player) {
    return { player, isKing: false, isMovable: false };
}

function isCheckerKing(checkerCoordinate, board) {
    return board[checkerCoordinate[1]][checkerCoordinate[0]].isKing;
}

function isForwardMove(checkerCoordinate, spaceCoordinate, direction) {
    return Math.sign(checkerCoordinate[1] - spaceCoordinate[1]) === Math.sign(direction);
}

function getPlayerDirection(player) {
    return player === PLAYER_ONE ? PLAYER_1_DIRECTION : PLAYER_2_DIRECTION;
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

function getAllImmediateMoveSpaces(coordinate) {
    return [
        [coordinate[0] + 1, coordinate[1] + 1],
        [coordinate[0] - 1, coordinate[1] - 1],
        [coordinate[0] + 1, coordinate[1] - 1],
        [coordinate[0] - 1, coordinate[1] + 1]
    ];
}

function isInImmediateVicinity(checkerCoordinate, spaceCoordinate) {
    const x = checkerCoordinate[0];
    const y = checkerCoordinate[1];
    return (spaceCoordinate[0] === x + 1 || spaceCoordinate[0] === x - 1)
        && (spaceCoordinate[1] === y + 1 || spaceCoordinate[1] === y - 1);
}

function skipsOverEnemyChecker(checkerCoordinate, spaceCoordinate, board, player) {
    const skippedCheckerX = checkerCoordinate[0] + (spaceCoordinate[0] - checkerCoordinate[0]) / 2;
    const skippedCheckerY = checkerCoordinate[1] + (spaceCoordinate[1] - checkerCoordinate[1]) / 2;
    if (skippedCheckerX % 1 !== 0 || skippedCheckerY % 1 !== 0) {
        return [];
    }
    const skippedChecker = board[skippedCheckerY][skippedCheckerX];
    if (skippedChecker && skippedChecker.player !== player) {
        return [skippedCheckerX, skippedCheckerY];
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