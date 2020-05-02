import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameMenu from "../components/GameMenu";
import { defaultGameSettings, defaultPlayerData } from "./testHelpers";

const mockGameSettingsUpdate = jest.fn((x) => x);
const mockUpdatePlayerData = jest.fn((x) => x);
const mockResetTimeData = jest.fn((x) => x);
test("Should update form changes", () => {
  const { container } = render(
    <MemoryRouter>
      <GameMenu
        gameSettings={defaultGameSettings}
        playerData={defaultPlayerData}
        updateGameSettings={mockGameSettingsUpdate}
        updatePlayerData={mockUpdatePlayerData}
        resetTimeData={mockResetTimeData}
      />
    </MemoryRouter>
  );
  const gameModeSelect = container.querySelector("[name='gameMode']");
  const playerInput = container.querySelector("[name='name']");
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
  expect(mockGameSettingsUpdate).toHaveBeenCalledTimes(1);
  expect(gameModeSelect.value).toEqual(gameModeLastOption.value);
  fireEvent.change(playerInput, { target: { value: "Test Name Input" } });
  expect(mockUpdatePlayerData).toHaveBeenCalledTimes(1);
  expect(playerInput.value).toEqual("Test Name Input");
  fireEvent.change(questionsSelect, {
    target: { value: questionsLastOption.value },
  });
  expect(mockGameSettingsUpdate).toHaveBeenCalledTimes(2);
  expect(questionsSelect.value).toEqual(questionsLastOption.value);
});

test("When the create button is clicked we go to the Game", () => {
  const { container } = render(
    <MemoryRouter>
      <GameMenu
        gameSettings={defaultGameSettings}
        playerData={defaultPlayerData}
        updateGameSettings={mockGameSettingsUpdate}
        updatePlayerData={mockUpdatePlayerData}
        resetTimeData={mockResetTimeData}
      />
    </MemoryRouter>
  );
  const createGameBtn = container.querySelector("form button");
  fireEvent.click(createGameBtn);
  const gameStartGameBtn = container.querySelector("#start-game");
  expect(gameStartGameBtn).toBeDefined();
});
