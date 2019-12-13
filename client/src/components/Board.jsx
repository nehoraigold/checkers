//region imports
import React from "react";
import Space from "./Space";

//endregion

const Board = () => {
    const NUMBER_OF_ROWS = 8;
    const NUMBER_OF_COLUMNS = 8;
    const colors = ["white", "black"];

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