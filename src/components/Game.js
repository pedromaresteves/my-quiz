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
    const currentQuestionNum = props.gameSettings.questions.currentQuestionNum;
    let nextQuestion = currentQuestionNum + 1;
    let playerNewState = { ...props.gameSettings.player };
    if (nextQuestion !== props.gameSettings.questions.results.length) {
      const changedGameSettingsData = {
        questions: {
          ...props.gameSettings.questions,
          currentQuestionNum: nextQuestion,
        },
        resetTimer: true,
      };
      if (!playerNewState.answers[currentQuestionNum])
        playerNewState.answers[currentQuestionNum] = null;
      props.updateGameSettings(changedGameSettingsData);
      if (props.time.timeLeft <= 1) {
        const changedtimeData = {
          timeRunning: true,
          timeLeft: props.questionTime,
        };
        props.updateTime(changedtimeData);
      }
    } else {
      const changedtimeData = {
        timeRunning: false,
        timeLeft: 0,
        gameOn: false,
      };
      props.updateTime(changedtimeData);
    }
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
      ) : !props.gameSettings.questions.currentQuestionNum ? (
        <div>
          <h4>Press the button to start the game. Get Ready!</h4>
          <button id="start-game" onClick={startTimer} ref={startTimerBtn}>
            Start game in {props.time.timeLeft}
          </button>
        </div>
      ) : (
        <p>RESULTS</p>
      )}
    </div>
  );
}

export default Game;
