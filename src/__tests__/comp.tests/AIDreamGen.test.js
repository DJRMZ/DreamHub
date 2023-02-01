import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
// import AIDreamGen from './AIDreamGen';
import AIDreamGen from "../../Components/AIDreamGen/index";

describe("AIDreamGen component", () => {
  it("renders correctly", () => {
    const { getByTestId, getByText } = render(<AIDreamGen />);
    expect(getByTestId("hours-input")).toBeTruthy();
    expect(getByTestId("submit-dream")).toBeTruthy();
    expect(getByText("Submit Dream")).toBeTruthy();
  });
  it("updates state when submitting a dream", () => {
    const { getByTestId, getByText } = render(<AIDreamGen />);
    fireEvent.changeText(getByTestId("hours-input"), "8 hours");
    fireEvent.press(getByText("Submit Dream"));
    expect(getByTestId("hours-input").props.value).toBe("8 hours");
  });
});
