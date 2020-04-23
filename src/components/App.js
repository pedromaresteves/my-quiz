import React, { useState, useEffect, useCallback } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Game from "./Game";
import GameMenu from "./GameMenu";
import PageNotFound from "./PageNotFound";
import "../App.css";

function App() {
  const questionTime = 5;
  const [gameSettings, setGameSettings] = useState(defaultGameSettings);
  const [time, setTime] = useState({
    timeLeft: 3,
    timeRunning: false,
    gameOn: false,
    startTimer: true,
  });
  const updateGameSettings = (propertyToUpdate, newValue) => {
    setGameSettings({ ...gameSettings, [propertyToUpdate]: newValue });
  };
  const updateTime = (propertyToUpdate, newValue) => {
    setTime({ ...time, [propertyToUpdate]: newValue });
  };

  const handleTime = useCallback(() => {
    setTimeout(() => {
      if (!time.timeLeft) {
        if (time.startTimer) {
          setTime({
            ...time,
            timeLeft: questionTime,
            gameOn: true,
            startTimer: false,
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
        if (gameSettings.resetTimer) {
          setGameSettings({ ...gameSettings, resetTimer: false });
          return setTime({
            ...time,
            timeLeft: questionTime,
            timeRunning: true,
          });
        } else {
          return setTime({
            ...time,
            timeLeft: --time.timeLeft,
            timeRunning: true,
          });
        }
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
            gameSettings={gameSettings}
            updateGameSettings={updateGameSettings}
          />
        </Route>
        <Route path="/game">
          <Game
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
            time={time}
            questionTime={questionTime}
            setTime={setTime}
            updateTime={updateTime}
            updateGameSettings={updateGameSettings}
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
  players: [
    {
      name: "Player 1",
      id: 1,
      answers: [],
    },
  ],
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
      {
        category: "Entertainment: Film",
        type: "multiple",
        difficulty: "hard",
        question:
          "What did Alfred Hitchcock use as blood in the film &quot;Psycho&quot;? ",
        correct_answer: "Chocolate syrup",
        incorrect_answers: ["Ketchup", "Red food coloring", "Maple syrup"],
      },
      {
        category: "Film",
        type: "multiple",
        difficulty: "easy",
        question: "Who's the worse actor?",
        correct_answer: "Keanu Reeves",
        incorrect_answers: ["Matthew Broderick", "Jude Law", "Nicolau Breyner"],
      },
      {
        category: "Music",
        type: "multiple",
        difficulty: "easy",
        question: "What's the worse music band in the world?",
        correct_answer: "NickelBack",
        incorrect_answers: [
          "Onda Shock",
          "João Matos e os Bandalma",
          "João Matos sem os desprezíveis Bandalma",
        ],
      },
      {
        category: "Videogames",
        type: "multiple",
        difficulty: "easy",
        question: "Qual é o melhor videojogo?",
        correct_answer: "Summer Challenge",
        incorrect_answers: [
          "Winter Challenge",
          "California Games 2",
          "Hot Rod",
        ],
      },
    ],
  },
  award: "A fancy thumbs up",
  resetTimer: false,
};
