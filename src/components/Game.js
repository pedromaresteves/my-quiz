import React, { useRef, useEffect } from "react";

function Question(props) {
  const currentQuestionNum = props.gameSettings.questions.currentQuestionNum;
  const currentQuestion =
    props.gameSettings.questions.results[currentQuestionNum];
  const allAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];
  const answersDiv = useRef(null);
  const selectAnswer = (e) => {
    const answerBtns = Array.from(answersDiv.current.children);
    answerBtns.forEach((btn) => {
      btn.classList.remove("active-answer");
    });
    props.gameSettings.players[0].answers[currentQuestionNum] = {
      questionNum: currentQuestionNum,
      answer: e.target.textContent,
    };
    e.target.classList.add("active-answer");
    //props.updateGameSettings(props.gameSettings);
  };
  allAnswers.sort(alphabeticSort);
  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <div id="possible-answers-list" ref={answersDiv}>
        {allAnswers.map((item) => (
          <button key={item} className="answer-btn" onClick={selectAnswer}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

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

const alphabeticSort = (a, b) => {
  var nameA = a.toUpperCase();
  var nameB = b.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export default Game;
