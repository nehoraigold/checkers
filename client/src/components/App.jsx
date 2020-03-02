//region imports
import React from "react";
import "../style/App.css";
import Board from "./Board";
import GameStatus from "./GameStatus"

//endregion

const App = () =>
    <div className="app">
        <div>
            <h1 style={{fontSize: "40px"}}>Checkers</h1>
        </div>
        <div className="main">
            <GameStatus/>
            <Board/>
            <div/>
        </div>
    </div>;

export default App;