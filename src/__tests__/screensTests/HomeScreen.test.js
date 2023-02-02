import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../../Screens/Home";

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
    const { getByText, queryByText } = render(<HomeScreen />);
    fireEvent.press(getByText("Create an Image"));
    expect(queryByText("DreamGen")).toBeTruthy();
  });

  it('navigates to the Notes component when the "Journal/Notes" button is pressed', () => {
    const { getByText, queryByText } = render(<HomeScreen />);
    fireEvent.press(getByText("Journal/Notes"));
    expect(queryByText("Notes")).toBeTruthy();
  });

  it('navigates to the Camera component when the "Take a picture" button is pressed', () => {
    const { getByText, queryByText } = render(<HomeScreen />);
    fireEvent.press(getByText("Take a picture"));
    expect(queryByText("Camera")).toBeTruthy();
  });

  it('navigates to the DreamCal component when the "Calendar" button is pressed', () => {
    const { getByText, queryByText } = render(<HomeScreen />);
    fireEvent.press(getByText("Calendar"));
    expect(queryByText("DreamCal")).toBeTruthy();
  });
});
