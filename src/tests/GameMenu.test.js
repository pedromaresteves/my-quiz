import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameMenu from "../components/GameMenu";
import { defaultGameSettings } from "./testHelpers";

const mockUpdateFunction = jest.fn((x) => x);
test("Should update form changes", () => {
  const { container } = render(
    <MemoryRouter>
      <GameMenu
        gameSettings={defaultGameSettings}
        updateGameSettings={mockUpdateFunction}
      />
    </MemoryRouter>
  );
  const gameModeSelect = container.querySelector("[name='gameMode']");
  const playerInput = container.querySelector("[name='players']");
  const questionsSelect = container.querySelector("[name='questions']");
  const gameModeLastOption = container.querySelector(
    "[name='gameMode'] option:last-child"
  );
  const questionsLastOption = container.querySelector(
    "[name='questions'] option:last-child"
  );
  expect(gameModeSelect.value).toEqual("default");
  fireEvent.change(gameModeSelect, {
    target: { value: gameModeLastOption.value },
  });
  expect(mockUpdateFunction).toHaveBeenCalledTimes(1);
  expect(gameModeSelect.value).toEqual(gameModeLastOption.value);
  fireEvent.change(playerInput, { target: { value: "Test Name Input" } });
  expect(mockUpdateFunction).toHaveBeenCalledTimes(2);
  expect(playerInput.value).toEqual("Test Name Input");
  fireEvent.change(questionsSelect, {
    target: { value: questionsLastOption.value },
  });
  expect(mockUpdateFunction).toHaveBeenCalledTimes(3);
  expect(questionsSelect.value).toEqual(questionsLastOption.value);
});

test("When the create button is clicked we go to the Game", () => {
  const { container } = render(
    <MemoryRouter>
      <GameMenu
        gameSettings={defaultGameSettings}
        updateGameSettings={mockUpdateFunction}
      />
    </MemoryRouter>
  );
  const createGameBtn = container.querySelector("form button");
  fireEvent.click(createGameBtn);
  const gameStartGameBtn = container.querySelector("#start-game");
  expect(gameStartGameBtn).toBeDefined();
});
