import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Results, getCorrectAnswerCount } from "../components/gameplay/Results";
import { mockQuestions, mockPlayerData } from "./testHelpers";

let firstAnswerToBeCorrect = mockQuestions.results[0].correct_answer;
let secondAnswerToBeIncorrect = "Incorrect Answer";

beforeEach(() => {
  mockPlayerData.answers = [];
});

test("Check that correct/incorrect answers have proper className", () => {
  mockPlayerData.answers = [firstAnswerToBeCorrect, secondAnswerToBeIncorrect];
  const { container } = render(
    <MemoryRouter>
      <Results questions={mockQuestions} playerData={mockPlayerData} />
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
  expect(getCorrectAnswerCount(mockQuestions, mockPlayerData)).toEqual(0);
  mockPlayerData.answers = [firstAnswerToBeCorrect, secondAnswerToBeIncorrect];
  expect(getCorrectAnswerCount(mockQuestions, mockPlayerData)).toEqual(1);
});
