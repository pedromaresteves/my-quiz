import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <Link to="/game-menu">
          <button>start quizz</button>
        </Link>
        <button>join quizz</button>
      </div>
    </div>
  );
}

export default Home;
