import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Results, getCorrectAnswerCount } from "../components/gameplay/Results";
import { defaultGameSettings, defaultPlayerData } from "./testHelpers";

let firstAnswerToBeCorrect =
  defaultGameSettings.questions.results[0].correct_answer;
let secondAnswerToBeIncorrect = "Incorrect Answer";

beforeEach(() => {
  defaultPlayerData.answers = [];
});

test("Check that correct/incorrect answers have proper className", () => {
  defaultPlayerData.answers = [
    firstAnswerToBeCorrect,
    secondAnswerToBeIncorrect,
  ];
  const { container } = render(
    <MemoryRouter>
      <Results
        gameSettings={defaultGameSettings}
        playerData={defaultPlayerData}
      />
    </MemoryRouter>
  );
  const firstAnswer = container.querySelector(
    "tr:nth-child(2) td:nth-child(3)"
  );
  const secondAnswer = container.querySelector(
    "tr:nth-child(3) td:nth-child(3)"
  );
  expect(firstAnswer.classList[0]).toEqual("correct");
  expect(secondAnswer.classList[0]).toEqual("incorrect");
});

test("getCorrectAnswerCount Works as expected", () => {
  expect(getCorrectAnswerCount(defaultGameSettings, defaultPlayerData)).toEqual(
    0
  );
  defaultPlayerData.answers = [
    firstAnswerToBeCorrect,
    secondAnswerToBeIncorrect,
  ];
  expect(getCorrectAnswerCount(defaultGameSettings, defaultPlayerData)).toEqual(
    1
  );
});
