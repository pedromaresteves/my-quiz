import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div id="home">
      <Link to="/game-menu">
        <button>start quiz</button>
      </Link>
    </div>
  );
}

export default Home;
