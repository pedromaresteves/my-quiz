import React, { useRef, useEffect } from "react";
import Question from "./Question";
import { Results } from "./Results";

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
  const currentQuestionNum = props.gameSettings.questions.currentQuestionNum;
  const startTimerBtn = useRef(null);
  const startTimer = () => {
    props.handleTime();
    startTimerBtn.current.disabled = true;
  };
  const goToNextQuestion = () => {
    let nextQuestion = currentQuestionNum + 1;
    let playerNewState = { ...props.gameSettings.player };
    if (!playerNewState.answers[currentQuestionNum])
      playerNewState.answers[currentQuestionNum] = null;
    const changedGameSettingsData = {
      questions: {
        ...props.gameSettings.questions,
        currentQuestionNum: nextQuestion,
      },
      player: playerNewState,
    };
    props.updateGameSettings(changedGameSettingsData);
    props.resetTimer();
    const changedtimeData = {
      timeLeft: 5,
      timeRunning: true,
    };
    if (nextQuestion === props.gameSettings.questions.results.length) {
      changedtimeData.gameOn = false;
      changedtimeData.timeRunning = false;
    }
    props.updateTime(changedtimeData);
  };

  // return (
  //   <div>
  //     <h2>Game</h2>
  //     {props.time.gameOn ? (
  //       <div>
  //         <p>
  //           Clock's ticking: <strong>{props.time.timeLeft}</strong>
  //         </p>
  //         <Question
  //           gameSettings={props.gameSettings}
  //           time={props.time}
  //           updateGameSettings={props.updateGameSettings}
  //         />
  //         <button className="next-question-btn" onClick={goToNextQuestion}>
  //           Next
  //         </button>
  //       </div>
  //     ) : !props.gameSettings.questions.currentQuestionNum ? (
  //       <div>
  //         <h4>Press the button to start the game. Get Ready!</h4>
  //         <button id="start-game" onClick={startTimer} ref={startTimerBtn}>
  //           Start game in {props.time.timeLeft}
  //         </button>
  //       </div>
  //     ) : (
  //       <Results gameSettings={props.gameSettings} />
  //     )}
  //   </div>
  // );
  return <Results gameSettings={props.gameSettings} />;
}

export default Game;
