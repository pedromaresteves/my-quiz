import React, { useState, useEffect } from "react";

function Question(props) {
  const currentQuestionNum = props.questions.currentQuestionNum;
  const currentQuestion = props.questions.results[currentQuestionNum];
  const allAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];
  allAnswers.sort(alphabeticSort);
  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <ul id="answer-list">
        {allAnswers.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
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
  const startTimer = () => {
    props.handleTime();
  };
  // if (!props.gameSettings.gameOn && props.gameSettings.timeLeft === 0) {
  // }
  return (
    <div>
      <h2>Game</h2>
      {props.gameSettings.gameOn ? (
        <div>
          <p>
            Clock's ticking: <strong>{props.gameSettings.time.timeLeft}</strong>
          </p>
          <Question questions={props.gameSettings.questions} />
        </div>
      ) : (
        <div>
          <h4>Press the button to start the game. Get Ready!</h4>
          <button onClick={startTimer}>
            Start game in {props.gameSettings.time.timeLeft}
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
