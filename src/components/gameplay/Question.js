import React, { useRef } from "react";
import dompurify from 'dompurify';
const sanitizer = dompurify.sanitize;

function Question(props) {
  const currentQuestionNum = props.questions.currentQuestionNum;
  const currentQuestion = props.questions.results[currentQuestionNum];
  const allAnswers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];
  const answersDiv = useRef(null);

  const selectAnswer = (e) => {
    const answerBtns = Array.from(answersDiv.current.children);
    const playerAnswers = props.playerData.answers;
    answerBtns.forEach((btn) => {
      btn.classList.remove("active-answer");
    });
    playerAnswers[currentQuestionNum] = e.target.textContent;
    props.updatePlayerData("answers", playerAnswers);
    e.target.classList.add("active-answer");
  };

  allAnswers.sort(alphabeticSort);

  return (
    <div>
      <h4 dangerouslySetInnerHTML={{__html: sanitizer(currentQuestion.question)}}></h4>
      <div id="possible-answers-list" ref={answersDiv}>
        {allAnswers.map((item) => (
          <button
            key={sanitizer(item)}
            className="answer-btn"
            disabled={!props.time.timeLeft}
            onClick={selectAnswer}
            dangerouslySetInnerHTML={{__html: sanitizer(item)}}
          >
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
