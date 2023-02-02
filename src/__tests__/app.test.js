// import React from "react";
// import { render } from "@testing-library/react-native";
// import { render } from "jest-expo";

// const App = require("../App");
// import App from "../App";

// describe("Properly renders App", () => {
//   it("renders correctly", () => {
//     const { getByText } = render(<App />);
//     expect().toBeDefined();
//   });
// });

const React = require("react");
const { render } = require("jest-expo");

const App = require("../App");

describe("Properly renders App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
