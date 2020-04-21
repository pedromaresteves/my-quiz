import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Game from "../components/Game";
import { defaultGameSettings, timeSettings } from "./testHelpers";

const mockUpdateFunction = jest.fn((x) => x);

test("With the default game settings the get ready message is shown", () => {
  const { container } = render(
    <MemoryRouter>
      <Game
        gameSettings={defaultGameSettings}
        time={timeSettings}
        updateGameSettings={mockUpdateFunction}
      />
    </MemoryRouter>
  );
  const getReadyMessage = container.querySelector("h4");
  const startBtn = container.querySelector("#start-game");
  expect(getReadyMessage.textContent).toContain("Get Ready!");
  expect(startBtn).toBeDefined();
});

test("With a multiple type question, there are 4 available answers", () => {
  timeSettings.gameOn = true;
  timeSettings.timeRunning = true;
  const { container } = render(
    <MemoryRouter>
      <Game gameSettings={defaultGameSettings} time={timeSettings} />
    </MemoryRouter>
  );
  const startBtn = container.querySelector("#start-game");
  const question = container.querySelector("h4");
  const possibleAnswers = container.querySelectorAll(
    "#possible-answers-list .answer-btn"
  );
  expect(startBtn).toBeNull();
  expect(question.textContent).toContain(
    defaultGameSettings.questions.results[
      defaultGameSettings.questions.currentQuestionNum
    ].question
  );
  expect(possibleAnswers.length).toEqual(4);
});

test("With a boolean type question, there are 2 available answers", () => {
  timeSettings.gameOn = true;
  timeSettings.timeRunning = true;
  defaultGameSettings.questions.currentQuestionNum = 1;
  const { container } = render(
    <MemoryRouter>
      <Game gameSettings={defaultGameSettings} time={timeSettings} />
    </MemoryRouter>
  );
  const startBtn = container.querySelector("#start-game");
  const question = container.querySelector("h4");
  const possibleAnswers = container.querySelectorAll(
    "#possible-answers-list .answer-btn"
  );
  expect(startBtn).toBeNull();
  expect(question.textContent).toContain(
    defaultGameSettings.questions.results[
      defaultGameSettings.questions.currentQuestionNum
    ].question
  );
  expect(possibleAnswers.length).toEqual(2);
});
