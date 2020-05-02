import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Game from "./gameplay/Game";
import GameMenu from "./GameMenu";
import PageNotFound from "./PageNotFound";
import "../App.css";

let timer;

function App() {
  const questionTime = 5;
  const [gameSettings, setGameSettings] = useState({ ...defaultGameSettings });
  const [playerData, setPlayerData] = useState({
    name: "Player 1",
    answers: [],
  });
  const [time, setTime] = useState({
    timeLeft: questionTime,
    timeRunning: false,
    gameOn: false,
  });
  const resetTimer = () => {
    clearTimeout(timer);
  };

  const resetPlayerData = () => {
    setPlayerData({
      name: "Player 1",
      answers: [],
    });
  };

  const resetGameAndTimeData = () => {
    setGameSettings({
      ...gameSettings,
      questions: {
        numberOfQuestions: 15,
        currentQuestionNum: 0,
        results: [
          {
            category: "Entertainment: Video Games",
            type: "multiple",
            difficulty: "easy",
            question:
              "Half-Life by Valve uses the GoldSrc game engine, which is a highly modified version of what engine?",
            correct_answer: "Quake Engine",
            incorrect_answers: ["Doom Engine", "id Engine", "Source Engine"],
          },
          {
            category: "Science & Nature",
            type: "boolean",
            difficulty: "easy",
            question:
              "Igneous rocks are formed by excessive heat and pressure.",
            correct_answer: "False",
            incorrect_answers: ["True"],
          },
        ],
      },
    });
  };

  const resetTimeData = () => {
    const changedtimeData = {
      timeLeft: questionTime,
      timeRunning: false,
      gameOn: false,
    };
    updateTime(changedtimeData);
    resetTimer();
  };

  const resetFullState = () => {
    resetPlayerData();
    resetGameAndTimeData();
    resetTimeData();
  };

  const updatePlayerData = (propertyToUpdate, newValue) => {
    return setPlayerData({
      ...playerData,
      [propertyToUpdate]: newValue,
    });
  };
  const updateGameSettings = (propertyToUpdate, optionalNewValue) => {
    if (
      typeof propertyToUpdate === "object" &&
      !Array.isArray(propertyToUpdate)
    ) {
      return setGameSettings({ ...gameSettings, ...propertyToUpdate });
    }
    return setGameSettings({
      ...gameSettings,
      [propertyToUpdate]: optionalNewValue,
    });
  };
  const updateTime = (objectWithNewValues) => {
    setTime({ ...time, ...objectWithNewValues });
  };

  const handleTime = useCallback(() => {
    timer = setTimeout(() => {
      if (!time.timeLeft) {
        if (!time.gameOn) {
          setTime({
            ...time,
            timeLeft: questionTime,
            gameOn: true,
            timeRunning: true,
          });
        } else {
          return setTime({
            ...time,
            timeLeft: 0,
            timeRunning: false,
          });
        }
      }
      if (time.timeLeft) {
        return setTime({
          ...time,
          timeLeft: --time.timeLeft,
          timeRunning: true,
        });
      }
    }, 1000);
  }, [time]);
  useEffect(() => {
    if (time.timeRunning) return handleTime();
  }, [time, handleTime]);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home resetFullState={resetFullState} />
        </Route>
        <Route path="/game-menu">
          <GameMenu
            gameSettings={gameSettings}
            playerData={playerData}
            updateGameSettings={updateGameSettings}
            updatePlayerData={updatePlayerData}
            resetTimeData={resetTimeData}
          />
        </Route>
        <Route path="/game">
          <Game
            gameSettings={gameSettings}
            playerData={playerData}
            time={time}
            questionTime={questionTime}
            resetTimer={resetTimer}
            updateTime={updateTime}
            updateGameSettings={updateGameSettings}
            updatePlayerData={updatePlayerData}
            handleTime={handleTime}
          />
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
  categories: "all",
  questions: {
    numberOfQuestions: 15,
    currentQuestionNum: 0,
    results: [
      {
        category: "Entertainment: Video Games",
        type: "multiple",
        difficulty: "easy",
        question:
          "Half-Life by Valve uses the GoldSrc game engine, which is a highly modified version of what engine?",
        correct_answer: "Quake Engine",
        incorrect_answers: ["Doom Engine", "id Engine", "Source Engine"],
      },
      {
        category: "Science & Nature",
        type: "boolean",
        difficulty: "easy",
        question: "Igneous rocks are formed by excessive heat and pressure.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
    ],
  },
  award: "A fancy thumbs up",
};
