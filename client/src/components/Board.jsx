//region imports
import React from "react";
import Space from "./Space";
import { BOARD_ROW_0_OFFSET, PLAYER_1_COLOR, PLAYER_2_COLOR } from "../utils/constants";

//endregion

const Board = () => {
    const NUMBER_OF_ROWS = 8;
    const NUMBER_OF_COLUMNS = 8;
    const colors = [PLAYER_1_COLOR, PLAYER_2_COLOR];
    if (BOARD_ROW_0_OFFSET % 2 === 0) {
        colors.reverse();
    }
    let index = 0;
    const returnRow = () => {
        let array = Array(NUMBER_OF_COLUMNS);
        for (let i = 0; i < array.length; i++) {
            array[i] = colors[index++ % colors.length];
        }
        index--;
        return array;
    };

    const spaces = [];
    for (let i = 0; i < NUMBER_OF_ROWS; i++) {
        spaces.push(returnRow());
    }

    return (
        <div className="board">
            {spaces.map((row, rowNumber) =>
                <div key={rowNumber} className="row">
                    {row.map((spaceColor, spaceNumber) =>
                        <Space key={spaceNumber}
                               color={spaceColor}
                               coordinate={[spaceNumber, rowNumber]}/> )}
                </div>)}
        </div>
    );
};

export default Board;