import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "./Button";

describe("Button", () => {
  it("renders correctly with title and icon", () => {
    const { getByText, getByTestId } = render(
      <Button title="Press me" icon="plus" onPress={() => {}} />
    );

    expect(getByText("Press me")).toBeTruthy();
    expect(getByTestId("icon")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Press me" icon="plus" onPress={onPress} />
    );

    fireEvent.press(getByText("Press me"));
    expect(onPress).toHaveBeenCalled();
  });
});
