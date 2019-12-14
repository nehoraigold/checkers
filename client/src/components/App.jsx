//region imports
import React from "react";
import "../style/App.css";
import Board from "./Board";
import GameStatus from "./GameStatus"

//endregion

const App = () =>
    <div className="app">
        {/*<Title/>*/}
        <GameStatus/>
        <Board/>
    </div>;

export default App;