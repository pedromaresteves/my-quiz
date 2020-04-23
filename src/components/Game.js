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
  const goToNextQuestion = () => {
    const newQuestionState = {
      ...props.gameSettings.question,
      currentQuestionNumber: ++props.gameSettings.questions.currentQuestionNum,
    };
    props.setGameSettings({
      ...props.gameSettings,
      question: newQuestionState,
      resetTimer: true,
    });
    if (props.time.timeLeft <= 1)
      props.setTime({
        ...props.time,
        timeLeft: props.questionTime,
        timeRunning: true,
      });
  };

  return (
    <div>
      <h2>Game</h2>
      {props.time.gameOn ? (
        !props.gameSettings.resetTimer ? (
          <div>
            <p>
              Clock's ticking: <strong>{props.time.timeLeft}</strong>
            </p>
            <Question
              gameSettings={props.gameSettings}
              time={props.time}
              updateGameSettings={props.updateGameSettings}
            />
            <button className="next-question-btn" onClick={goToNextQuestion}>
              Next
            </button>
          </div>
        ) : (
          <div>
            <p>
              Clock's ticking: <strong>{props.questionTime}</strong>
            </p>
            <p>Get ready Darling</p>
          </div>
        )
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
