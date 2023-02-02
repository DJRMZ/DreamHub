import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";

describe("HomeScreen", () => {
  it("renders the welcome message", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Welcome to DreamHub!")).toBeTruthy();
  });

  it("renders all buttons", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("Create an Image")).toBeTruthy();
    expect(getByText("Journal/Notes")).toBeTruthy();
    expect(getByText("Take a picture")).toBeTruthy();
    expect(getByText("Calendar")).toBeTruthy();
  });

  it('navigates to the DreamGen component when the "Create an Image" button is pressed', () => {
    // To-do: write a test to check if the component is rendered and navigated to.
  });

  it('navigates to the Notes component when the "Journal/Notes" button is pressed', () => {
    // To-do: write a test to check if the component is rendered and navigated to.
  });

  it('navigates to the Camera component when the "Take a picture" button is pressed', () => {
    // To-do: write a test to check if the component is rendered and navigated to.
  });

  it('navigates to the DreamCal component when the "Calendar" button is pressed', () => {
    // To-do: write a test to check if the component is rendered and navigated to.
  });
});
