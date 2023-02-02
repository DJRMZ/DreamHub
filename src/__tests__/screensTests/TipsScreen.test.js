import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import TipsScreen from "../../Screens/TipsScreen";

describe("TipsScreen", () => {
  it("renders correctly", async () => {
    const { getByText, getAllByType } = render(<TipsScreen />);

    await waitFor(() => {
      expect(getByText("Welcome to DreamHub")).toBeTruthy();
    });

    const cards = getAllByType(Card);
    expect(cards.length).toBe(10);

    expect(
      getByText("Card 1: Create a routine or sleep schedule")
    ).toBeTruthy();
    expect(
      getByText(
        "Card 2: Plan accordingly with your routine what and when you eat and drink"
      )
    ).toBeTruthy();
    expect(
      getByText(
        "Card 3: Create an environment that promotes rest and relaxation."
      )
    ).toBeTruthy();
    expect(
      getByText("Card 4: Regular exercise and staying active")
    ).toBeTruthy();
    expect(
      getByText("Card 5: Keep napping during the day to a minimum")
    ).toBeTruthy();
    expect(
      getByText("Card 6: Quality Mattress, pillow(s) and bedding")
    ).toBeTruthy();
    expect(getByText("Card 7: Reserve the bed for sleeping")).toBeTruthy();
    expect(
      getByText("Card 8: Journal or keep a daily sleep diary")
    ).toBeTruthy();
    expect(getByText("Card 9: Check in with your Doctor")).toBeTruthy();
    expect(
      getByText(
        "Card 10: Increase your exposure to bright light during the day"
      )
    ).toBeTruthy();
  });
});
