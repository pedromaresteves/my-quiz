import React, { useRef } from "react";

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
    let newPropertyValue;
    const answerBtns = Array.from(answersDiv.current.children);
    answerBtns.forEach((btn) => {
      btn.classList.remove("active-answer");
    });
    newPropertyValue = { ...props.gameSettings.player };
    newPropertyValue.answers[currentQuestionNum] = e.target.textContent;
    e.target.classList.add("active-answer");
    props.updateGameSettings(newPropertyValue);
  };

  allAnswers.sort(alphabeticSort);

  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <div id="possible-answers-list" ref={answersDiv}>
        {allAnswers.map((item) => (
          <button
            key={item}
            className="answer-btn"
            disabled={!props.time.timeLeft}
            onClick={selectAnswer}
          >
            {item}
          </button>
        ))}
      </div>
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

export default Question;
