import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Results, getCorrectAnswerCount } from "../components/gameplay/Results";
import { defaultGameSettings } from "./testHelpers";

let firstAnswerToBeCorrect =
  defaultGameSettings.questions.results[0].correct_answer;
let secondAnswerToBeIncorrect = "Incorrect Answer";

beforeEach(() => {
  defaultGameSettings.player.answers = [];
});

test("Check that correct/incorrect answers have proper className", () => {
  defaultGameSettings.player.answers = [
    firstAnswerToBeCorrect,
    secondAnswerToBeIncorrect,
  ];
  const { container } = render(
    <MemoryRouter>
      <Results gameSettings={defaultGameSettings} />
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
  expect(getCorrectAnswerCount(defaultGameSettings)).toEqual(0);
  defaultGameSettings.player.answers = [
    firstAnswerToBeCorrect,
    secondAnswerToBeIncorrect,
  ];
  expect(getCorrectAnswerCount(defaultGameSettings)).toEqual(1);
});
