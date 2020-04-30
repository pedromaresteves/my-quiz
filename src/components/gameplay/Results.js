import React from "react";

function Results(props) {
  const correctAnswersNumber = getCorrectAnswerCount(
    props.gameSettings,
    props.playerData
  );
  return (
    <div id="results">
      <h1>Results</h1>
      <h2>
        {props.playerData.name} score: {correctAnswersNumber}/
        {props.gameSettings.questions.results.length}
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
          {props.gameSettings.questions.results.map((item) => {
            const answer =
              props.playerData.answers[
                props.gameSettings.questions.results.indexOf(item)
              ];
            return (
              <tr key={item.question}>
                <td>{item.question}</td>
                <td>{item.correct_answer}</td>
                <td
                  className={
                    answer === item.correct_answer ? "correct" : "incorrect"
                  }
                >
                  {answer}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const getCorrectAnswerCount = (gameSettings, playerData) => {
  let correctAnswersCounter = 0;
  gameSettings.questions.results.forEach((item) => {
    const answer =
      playerData.answers[gameSettings.questions.results.indexOf(item)];
    if (answer === item.correct_answer) correctAnswersCounter++;
  });
  return correctAnswersCounter;
};

export { getCorrectAnswerCount, Results };
