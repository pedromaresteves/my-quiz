import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Game from "../components/gameplay/Game";
import { mockQuestions, defaultPlayerData, mockTime } from "./testHelpers";

const mockUpdateFunction = jest.fn((x) => x);

test("With the default game settings the get ready message is shown", () => {
  const { container } = render(
    <MemoryRouter>
      <Game
        questions={mockQuestions}
        playerData={defaultPlayerData}
        time={mockTime}
        updateGameSettings={mockUpdateFunction}
        resetTimeData={mockUpdateFunction}
      />
    </MemoryRouter>
  );
  const getReadyMessage = container.querySelector("h4");
  const startBtn = container.querySelector("#start-game");
  expect(getReadyMessage.textContent).toContain("Press the button to start the game.");
  expect(startBtn).toBeDefined();
});

test("With a multiple type question, there are 4 available answers", () => {
  mockTime.gameOn = true;
  mockTime.timeRunning = true;
  const { container } = render(
    <MemoryRouter>
      <Game questions={mockQuestions} time={mockTime} resetTimeData={mockUpdateFunction} />
    </MemoryRouter>
  );
  const startBtn = container.querySelector("#start-game");
  const question = container.querySelector("h4");
  const possibleAnswers = container.querySelectorAll(
    "#possible-answers-list .answer-btn"
  );
  expect(startBtn).toBeNull();
  expect(question.textContent).toContain(
    mockQuestions.results[mockQuestions.currentQuestionNum].question
  );
  expect(possibleAnswers.length).toEqual(4);
});

test("With a boolean type question, there are 2 available answers", () => {
  mockTime.gameOn = true;
  mockTime.timeRunning = true;
  mockQuestions.currentQuestionNum = 1;
  const { container } = render(
    <MemoryRouter>
      <Game questions={mockQuestions} time={mockTime} resetTimeData={mockUpdateFunction} />
    </MemoryRouter>
  );
  const startBtn = container.querySelector("#start-game");
  const question = container.querySelector("h4");
  const possibleAnswers = container.querySelectorAll(
    "#possible-answers-list .answer-btn"
  );
  expect(startBtn).toBeNull();
  expect(question.textContent).toContain(
    mockQuestions.results[mockQuestions.currentQuestionNum].question
  );
  expect(possibleAnswers.length).toEqual(2);
});
