import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Game from "../components/Game";
import { defaultGameSettings } from "./testHelpers";

const mockUpdateFunction = jest.fn((x) => x);

test("With default game settings the get ready message is shown", () => {
  const { container } = render(
    <MemoryRouter>
      <Game
        gameSettings={defaultGameSettings}
        updateGameSettings={mockUpdateFunction}
      />
    </MemoryRouter>
  );
  const getReadyMessage = container.querySelector("h4");
  const startBtn = container.querySelector("button");
  expect(getReadyMessage.textContent).toContain("Get Ready!");
  expect(startBtn).toBeDefined();
});

test("When gameOn is true and time running is true, questions are shown", () => {
  defaultGameSettings.gameOn = true;
  defaultGameSettings.time.timeRunning = true;
  const { container } = render(
    <MemoryRouter>
      <Game
        gameSettings={defaultGameSettings}
        updateGameSettings={mockUpdateFunction}
      />
    </MemoryRouter>
  );
  const question = container.querySelector("h4");
  const startBtn = container.querySelector("button");
  expect(question.textContent).toContain(
    defaultGameSettings.questions.results[0].question
  );
  expect(startBtn).toBeNull();
});
