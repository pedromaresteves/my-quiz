import React, { useState, useEffect } from "react";

function Game(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setQuestionNumber] = useState(0);
  const [gameOn, setGameOn] = useState(false);
  let [timeLeft, setTimeLeft] = useState(5);
  useEffect(() => {
    // fetch("https://opentdb.com/api.php?amount=10")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     if (data.response_code === 0) setQuestions(data.results);
    //   });
    setQuestions(mockResults);
    if (!timeLeft) return;
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);
  if (!gameOn && timeLeft === 0) {
    setGameOn(true);
    setTimeLeft(35);
    setQuestionNumber(1);
  }
  return (
    <div>
      <h2>Game</h2>
      {gameOn ? (
        <p>
          Clock's ticking: <strong>{timeLeft}</strong>
        </p>
      ) : null}
      {gameOn ? (
        <h4>{questions[0].question}</h4>
      ) : (
        <h4>Game will start in {timeLeft}. Get Ready</h4>
      )}
    </div>
  );
}

export default Game;

const mockResults = [
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "easy",
    question:
      "Half-Life by Valve uses the GoldSrc game engine, which is a highly modified version of what engine?",
    correct_answer: "Quake Engine",
    incorrect_answers: ["Doom Engine", "id Engine", "Source Engine"],
  },
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "hard",
    question:
      "What did Alfred Hitchcock use as blood in the film &quot;Psycho&quot;? ",
    correct_answer: "Chocolate syrup",
    incorrect_answers: ["Ketchup", "Red food coloring", "Maple syrup"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "medium",
    question: "&quot;Windows NT&quot; is a monolithic kernel.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Entertainment: Cartoon & Animations",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of these is not a real character in the cartoon series My Little Pony: Friendship is Magic?",
    correct_answer: "Rose Marene",
    incorrect_answers: ["Pinkie Pie", "Maud Pie", "Rainbow Dash"],
  },
  {
    category: "Celebrities",
    type: "multiple",
    difficulty: "easy",
    question: "Aubrey Graham is better known as",
    correct_answer: "Drake",
    incorrect_answers: ["Travis Scott", "Lil Wayne", "2 Chainz"],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "Which of these characters was almost added into Super Smash Bros. Melee, but not included as the game was too far in development?",
    correct_answer: "Solid Snake",
    incorrect_answers: ["Pit", "Meta Knight", "R.O.B."],
  },
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question:
      "In Left 4 Dead, which campaign has the protagonists going through a subway in order to reach a hospital for evacuation?",
    correct_answer: "No Mercy",
    incorrect_answers: ["Subway Sprint", "Hospital Havoc", "Blood Harvest"],
  },
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "medium",
    question: "What is Lilo&#039;s last name from Lilo and Stitch?",
    correct_answer: "Pelekai",
    incorrect_answers: ["Anoa\u02bbi", "Kealoha", "Ku\u02bbulei"],
  },
  {
    category: "Entertainment: Film",
    type: "multiple",
    difficulty: "medium",
    question: "In Finding Nemo, what was the name of Nemo&#039;s mom?",
    correct_answer: "Coral",
    incorrect_answers: ["Sandy", "Pearl", "Shelly"],
  },
  {
    category: "Entertainment: Music",
    type: "multiple",
    difficulty: "easy",
    question:
      "&quot;Hallelujah&quot; is a song written by which Canadian recording artist?",
    correct_answer: "Leonard Cohen",
    incorrect_answers: ["Kory Lefkowits", "Ryan Letourneau ", "Justin Bieber "],
  },
];
