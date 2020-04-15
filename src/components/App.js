import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Game from "./Game";
import GameMenu from "./GameMenu";
import PageNotFound from "./PageNotFound";
import "../App.css";

function App() {
  const [gameSettings, setGameSettings] = useState(defaultGameSettings);
  const updateGameSettings = (dataToChange, newValue) => {
    setGameSettings({ ...gameSettings, [dataToChange]: newValue });
  };
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game-menu">
          <GameMenu
            gameSettings={gameSettings}
            updateGameSettings={updateGameSettings}
          />
        </Route>
        <Route path="/game">
          <Game gameSettings={gameSettings} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const defaultGameSettings = {
  gameMode: "default",
  players: [
    {
      name: "Player 1",
    },
  ],
  categories: "all",
  numberOfQuestions: 10,
  award: "A fancy thumbs up",
};
