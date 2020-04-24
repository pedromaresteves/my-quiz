import React from "react";
import { Link } from "react-router-dom";

function GameMenu(props) {
  const handleFormChanges = (e) => {
    const propertyToUpdate = e.target.name;
    let newPropertyValue = e.target.value;
    if (propertyToUpdate === "player") {
      newPropertyValue = { ...props.gameSettings.player, name: e.target.value };
    } else if (propertyToUpdate === "questions") {
      newPropertyValue = {
        ...props.gameSettings.questions,
        numberOfQuestions: Number(e.target.value),
      };
    }
    props.updateGameSettings(propertyToUpdate, newPropertyValue);
  };
  return (
    <div id="game-menu">
      <h2>Welcome to the Game Menu</h2>
      <form>
        <div>
          <label htmlFor="player">Insert your name </label>
          <input
            name="player"
            defaultValue={props.gameSettings.player.name}
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
            defaultValue={props.gameSettings.questions.numberOfQuestions}
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
