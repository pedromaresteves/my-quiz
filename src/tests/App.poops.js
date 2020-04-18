import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../components/App";

test("renders learn react link", () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
