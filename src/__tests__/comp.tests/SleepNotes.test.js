import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SleepNotes from "../../Components/SleepNotes";

describe("SleepNotes component", () => {
  it("renders modal", () => {
    const { getByText } = render(<SleepNotes />);
    fireEvent.press(getByText("GENERATE DREAM INSTANCE"));
    expect(getByText("How did you sleep?")).toBeTruthy();
  });

  it("selects value from Select component", () => {
    const { getByText, queryByText } = render(<SleepNotes />);
    fireEvent.press(getByText("GENERATE DREAM INSTANCE"));
    fireEvent.press(getByText("6 - 8 hours"));
    expect(queryByText("Default")).toBeFalsy();
    expect(getByText("6 - 8 hours")).toBeTruthy();
  });

  it("toggles value of Radio component", () => {
    const { getByText } = render(<SleepNotes />);
    fireEvent.press(getByText("GENERATE DREAM INSTANCE"));
    fireEvent.press(getByText("Yes"));
    expect(getByText("Yes")).toBeTruthy();
    fireEvent.press(getByText("No"));
    expect(getByText("No")).toBeTruthy();
  });
});
