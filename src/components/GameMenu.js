import React from "react";
import { Link } from "react-router-dom";

function GameMenu(props) {
  const handleFormChanges = (e) => {
    const propertyToUpdate = e.target.name;
    let newValue = e.target.value;
    if (Number(newValue)) {
      newValue = Number(newValue);
    }
    if (propertyToUpdate === "players") {
      props.gameSettings[e.target.name][0].name = newValue;
    } else if (propertyToUpdate === "questions") {
      props.gameSettings.questions.numberOfQuestions = newValue;
    } else {
      props.gameSettings[e.target.name] = newValue;
    }
    props.updateGameSettings(props.gameSettings);
  };
  return (
    <div id="game-menu">
      <h2>Welcome to the Game Menu</h2>
      <form>
        <div>
          <label htmlFor="players">Insert your name </label>
          <input
            name="players"
            defaultValue={props.gameSettings.players[0].name}
            onChange={handleFormChanges}
          ></input>
        </div>
        <div>
          <label htmlFor="gameMode">Choose Game Mode: </label>

          <select
            name="gameMode"
            defaultValue={props.gameSettings.gameMode}
            onChange={handleFormChanges}
          >
            <option value="default">Default</option>
            <option value="beQuizzmaster">Be The Quizzmaster</option>
          </select>
        </div>
        <div>
          <label htmlFor="questions">Set Number Of Questions: </label>

          <select
            name="questions"
            defaultValue={props.gameSettings.numberOfQuestions}
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
            <button type="submit">Create Game</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default GameMenu;
