import React from "react";
import { Link } from "react-router-dom";
import dompurify from 'dompurify';
const sanitizer = dompurify.sanitize;

function Results(props) {
  const correctAnswersNumber = getCorrectAnswerCount(
    props.questions,
    props.playerData
  );
  return (
    <div id="results">
      <h1>Results</h1>
      <h2>
        {props.playerData.name} score: {correctAnswersNumber}/
        {props.questions.results.length}
      </h2>
      <table>
        <thead>
          <tr>
            <th colSpan="3">Here are your results</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Question</th>
            <th>Correct Answer</th>
            <th>{props.playerData.name}</th>
          </tr>
          {props.questions.results.map((item) => {
            const answer =
              props.playerData.answers[props.questions.results.indexOf(item)];
            return (
              <tr key={item.question}>
                <td dangerouslySetInnerHTML={{__html: sanitizer(item.question)}}></td>
                <td dangerouslySetInnerHTML={{__html: sanitizer(item.correct_answer)}}></td>
                <td
                  className={
                    answer === item.correct_answer ? "correct" : "incorrect"
                  }
                  dangerouslySetInnerHTML={{__html: sanitizer(answer)}}
                >
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/">
        <button>Back to Homepage</button>
      </Link>
    </div>
  );
}

const getCorrectAnswerCount = (questions, playerData) => {
  let correctAnswersCounter = 0;
  questions.results.forEach((item) => {
    const answer = playerData.answers[questions.results.indexOf(item)];
    if (answer === item.correct_answer) correctAnswersCounter++;
  });
  return correctAnswersCounter;
};

export { getCorrectAnswerCount, Results };
