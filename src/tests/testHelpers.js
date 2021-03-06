const multipleAnswerQuestion = {
  category: "Entertainment: Video Games",
  type: "multiple",
  difficulty: "easy",
  question:
    "Half-Life by Valve uses the GoldSrc game engine, which is a highly modified version of what engine?",
  correct_answer: "Quake Engine",
  incorrect_answers: ["Doom Engine", "id Engine", "Source Engine"],
};

const booleanAnswer = {
  category: "Science & Nature",
  type: "boolean",
  difficulty: "easy",
  question: "Igneous rocks are formed by excessive heat and pressure.",
  correct_answer: "False",
  incorrect_answers: ["True"],
};

const mockQuestions = {
  gameMode: "default",
  categories: "all",
  numberOfQuestions: 5,
  currentQuestionNum: 0,
  results: [multipleAnswerQuestion, booleanAnswer],
};

const mockPlayerData = {
  name: "Player 1",
  answers: [],
};

const mockTime = {
  timeLeft: 3,
  timeRunning: false,
  gameOn: false,
};

export { mockQuestions, mockPlayerData, mockTime };
