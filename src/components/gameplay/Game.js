import React, { useRef, useEffect } from "react";
import Question from "./Question";
import { Results } from "./Results";

function Game(props) {
  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${props.questions.numberOfQuestions}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.response_code === 0) {
          props.updateQuestions("results", data.results);
        }
      });
  }, []);
  const currentQuestionNum = props.questions.currentQuestionNum;
  const startTimerBtn = useRef(null);
  const startTimer = () => {
    props.handleTime();
    startTimerBtn.current.disabled = true;
  };

  const goToNextQuestion = () => {
    let nextQuestion = currentQuestionNum + 1;
    const isLastQuestion = nextQuestion === props.questions.results.length;
    if (!props.playerData.answers[currentQuestionNum]) {
      props.updatePlayerData("answers", [...props.playerData.answers, null]);
    }
    const newTimeState = timeState4NextQuestion(
      isLastQuestion,
      props.questionTime
    );
    props.updateQuestions("currentQuestionNum", nextQuestion);
    props.resetTimer();
    props.updateTime(newTimeState);
  };

  return (
    <div>
      {props.time.gameOn ? (
        <div>
          <p>
            Clock's ticking: <strong>{props.time.timeLeft}</strong>
          </p>
          <Question
            questions={props.questions}
            playerData={props.playerData}
            time={props.time}
            updatePlayerData={props.updatePlayerData}
          />
          <button className="next-question-btn" onClick={goToNextQuestion}>
            Next
          </button>
        </div>
      ) : !props.questions.currentQuestionNum ? (
        <div>
          <h4>Press the button to start the game.</h4>
          <button id="start-game" onClick={startTimer} ref={startTimerBtn}>
            Start Countdown
          </button>
          {props.time.timeRunning ? (
            <p>You have {props.time.timeLeft} seconds to get ready</p>
          ) : (
            <p>You'll have 3 seconds to get ready</p>
          )}
        </div>
      ) : (
        <Results questions={props.questions} playerData={props.playerData} />
      )}
    </div>
  );
}

const timeState4NextQuestion = (isLastQuestion, standardQuestionTime) => {
  const changedtimeData = {
    timeLeft: standardQuestionTime,
    timeRunning: true,
  };
  if (isLastQuestion) {
    changedtimeData.gameOn = false;
    changedtimeData.timeRunning = false;
  }
  return changedtimeData;
};

export default Game;
