const defaultGameSettings = {
  gameMode: "default",
  players: [
    {
      name: "Player 1",
      id: 1,
      answers: [],
    },
  ],
  categories: "all",
  questions: {
    numberOfQuestions: 5,
    currentQuestionNum: 0,
    results: [
      {
        category: "Entertainment: Video Games",
        type: "multiple",
        difficulty: "easy",
        question:
          "Half-Life by Valve uses the GoldSrc game engine, which is a highly modified version of what engine?",
        correct_answer: "Quake Engine",
        incorrect_answers: ["Doom Engine", "id Engine", "Source Engine"],
      },
    ],
  },
  award: "A fancy thumbs up",
  time: { timeLeft: 5, timeRunning: false },
  gameOn: false,
};

export { defaultGameSettings };
