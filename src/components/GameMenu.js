import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";

function GameMenu(props) {
  const handleChange = (e) => {
    console.log(e.target.value, e.target.name, "SEND SHIT");
    props.updateGameSettings(e.target.name, e.target.value);
  };
  return (
    <div>
      <h2>Welcome to the Game Menu</h2>
      <button>Be a Quizzmaster</button>
      <form>
        <label>Choose Game Mode: </label>

        <select
          name="gameMode"
          value={props.gameSettings.gameMode}
          onChange={handleChange}
        >
          <option value="default">Default</option>
          <option value="beQuizzmaster">Be The Quizzmaster</option>
        </select>

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
