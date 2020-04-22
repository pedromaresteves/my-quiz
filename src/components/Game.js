import React, { useRef, useEffect } from "react";
import Question from "./Question";

function Game(props) {
  useEffect(() => {
    // fetch(`https://opentdb.com/api.php?amount=${props.gameSettings.numberOfQuestions}`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (data.response_code === 0){
    //     props.gameSettings.questions.results = data.results;
    //     props.updateGameSettings(props.gameSettings.questions.results);
    //}
    //   });
  });
  const startTimerBtn = useRef(null);
  const startTimer = () => {
    props.handleTime();
    startTimerBtn.current.disabled = true;
  };

  return (
    <div>
      <h2>Game</h2>
      {props.time.gameOn ? (
        <div>
          <p>
            Clock's ticking: <strong>{props.time.timeLeft}</strong>
          </p>
          <Question
            gameSettings={props.gameSettings}
            updateGameSettings={props.updateGameSettings}
          />
        </div>
      ) : (
        <div>
          <h4>Press the button to start the game. Get Ready!</h4>
          <button id="start-game" onClick={startTimer} ref={startTimerBtn}>
            Start game in {props.time.timeLeft}
          </button>
        </div>
      )}
    </div>
  );
}

export default Game;
