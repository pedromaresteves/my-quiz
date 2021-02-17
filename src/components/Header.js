import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
      <Link className="not-normal-link" to="/">
        <h1>Panther Quiz 2000</h1>
      </Link>
    </header>
  );
}

export default Header;
