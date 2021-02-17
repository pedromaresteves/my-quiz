import React from "react";
import { Link } from "react-router-dom";

function GameMenu(props) {
  const handleFormChanges = (e) => {
    const propertyToUpdate = e.target.name;
    let newPropertyValue = e.target.value;
    if (propertyToUpdate === "name") {
      return props.updatePlayerData(propertyToUpdate, newPropertyValue);
    }
    if (Number(newPropertyValue)) newPropertyValue = Number(newPropertyValue);
    return props.updateQuestions(propertyToUpdate, newPropertyValue);
  };
  const setNewGame = () => {
    props.resetTimeData(true);
    return props.updateQuestions("currentQuestionNum", 0);
  };
  return (
    <div id="game-menu">
      <h2>Welcome to the Game Menu</h2>
      <form>
        <div>
          <label htmlFor="name">Insert your name </label>
          <input
            name="name"
            defaultValue={props.playerData.name}
            onChange={handleFormChanges}
          ></input>
        </div>
        <div>
          <label htmlFor="numberOfQuestions">Set Number Of Questions: </label>
          <select
            name="numberOfQuestions"
            defaultValue={props.questions.numberOfQuestions}
            onChange={handleFormChanges}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
        <div className="form-group">
          <Link to="game">
            <button type="submit" onClick={setNewGame}>
              Create Game
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default GameMenu;
