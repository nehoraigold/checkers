//region imports
import React from "react";
import Space from "./Space";
import { BOARD_ROW_0_OFFSET, SPACE_COLORS } from "../utils/constants";

//endregion

const Board = () => {
    const NUMBER_OF_ROWS = 8;
    const NUMBER_OF_COLUMNS = 8;
    const colors = SPACE_COLORS.slice(0, 2);
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
            {spaces.map((row, y) =>
                <div key={y} className="row">
                    {row.map((spaceColor, x) =>
                        <Space key={x}
                               color={spaceColor}
                               coordinate={[x, y]}/> )}
                </div>)}
        </div>
    );
};

export default Board;