import React from "react";
import { render } from "@testing-library/react-native";
import App from "../App";

describe("Properly renders App", () => {
  it("renders correctly", () => {
    const { getByText } = render(<App />);
    expect().toBeDefined();
  });
});
