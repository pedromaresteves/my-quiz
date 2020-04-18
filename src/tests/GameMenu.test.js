import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GameMenu from "../components/GameMenu";

test("Should update game mode select", async () => {
  const mockUpdateFunction = jest.fn((x) => x);
  const { container } = render(
    <Router>
      <GameMenu
        gameSettings={mockGameSettings}
        updateGameSettings={mockUpdateFunction}
      />
    </Router>
  );
  const gameModeSelector = container.querySelector("[name='gameMode']");
  const option2 = container.querySelector(
    "[name='gameMode'] option:last-child"
  );
  expect(gameModeSelector.value).toEqual("default");
  fireEvent.change(gameModeSelector, { target: { value: option2.value } });
  expect(gameModeSelector.value).toEqual(option2.value);
  expect(mockUpdateFunction).toHaveBeenCalledTimes(1);
});

const mockGameSettings = {
  gameMode: "default",
  players: [
    {
      name: "Player 1",
    },
  ],
  categories: "all",
  numberOfQuestions: 10,
  award: "A fancy thumbs up",
};
