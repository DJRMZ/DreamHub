const React = require("react");
const { render } = require("@testing-library/react-native");
// const { render } = require("jest-expo");
const App = require("../App");

describe("Properly renders App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
