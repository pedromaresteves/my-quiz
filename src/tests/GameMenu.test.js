import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameMenu from "../components/GameMenu";
import { mockQuestions, mockPlayerData } from "./testHelpers";

const mockUpdateQuestions = jest.fn((x) => x);
const mockUpdatePlayerData = jest.fn((x) => x);
const mockResetTimeData = jest.fn((x) => x);
test("Should update form changes", () => {
  const { container } = render(
    <MemoryRouter>
      <GameMenu
        questions={mockQuestions}
        playerData={mockPlayerData}
        updateQuestions={mockUpdateQuestions}
        updatePlayerData={mockUpdatePlayerData}
        resetTimeData={mockResetTimeData}
      />
    </MemoryRouter>
  );
  const playerInput = container.querySelector("[name='name']");
  const questionsSelect = container.querySelector("[name='numberOfQuestions']");
  const questionsLastOption = container.querySelector(
    "[name='numberOfQuestions'] option:last-child"
  );
  expect(mockUpdateQuestions).toHaveBeenCalledTimes(0);
  fireEvent.change(playerInput, { target: { value: "Test Name Input" } });
  expect(mockUpdatePlayerData).toHaveBeenCalledTimes(1);
  expect(playerInput.value).toEqual("Test Name Input");
  fireEvent.change(questionsSelect, {
    target: { value: questionsLastOption.value },
  });
  expect(mockUpdateQuestions).toHaveBeenCalledTimes(1);
  expect(questionsSelect.value).toEqual(questionsLastOption.value);
});

test("When the create button is clicked we go to the Game", () => {
  const { container } = render(
    <MemoryRouter>
      <GameMenu
        questions={mockQuestions}
        playerData={mockPlayerData}
        updateQuestions={mockUpdateQuestions}
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
