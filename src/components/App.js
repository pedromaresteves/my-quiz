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
  const questionTime = 45;
  const countdownTime = 3;
  const [questions, setQuestions] = useState({
    gameMode: "default",
    categories: "all",
    numberOfQuestions: 5,
    currentQuestionNum: 0,
    results: [],
  });
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

  const resetTimeData = (countdown) => {
    const changedtimeData = {
      timeLeft: questionTime,
      timeRunning: false,
      gameOn: false,
    };
    if (countdown) changedtimeData.timeLeft = countdownTime;
    updateTime(changedtimeData);
    resetTimer();
  };

  const updatePlayerData = (propertyToUpdate, newValue) => {
    return setPlayerData({
      ...playerData,
      [propertyToUpdate]: newValue,
    });
  };
  const updateQuestions = (propertyToUpdate, newValue) => {
    return setQuestions({
      ...questions,
      [propertyToUpdate]: newValue,
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
          <Home />
        </Route>
        <Route path="/game-menu">
          <GameMenu
            playerData={playerData}
            questions={questions}
            updateQuestions={updateQuestions}
            updatePlayerData={updatePlayerData}
            resetTimeData={resetTimeData}
          />
        </Route>
        <Route path="/game">
          <Game
            playerData={playerData}
            questions={questions}
            updateQuestions={updateQuestions}
            time={time}
            questionTime={questionTime}
            resetTimer={resetTimer}
            updateTime={updateTime}
            updatePlayerData={updatePlayerData}
            handleTime={handleTime}
            resetTimeData={resetTimeData}
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
