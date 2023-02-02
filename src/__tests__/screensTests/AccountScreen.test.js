import React from "react";
import { render, fireEvent } from "react-testing-library";
import AccountScreen from "../../Screens/Account";
import SignOutButton from "../Auth/SignOut";
import SignOutButton from "../../Auth/SignOut";

describe("AccountScreen", () => {
  it("renders the correct content", () => {
    const { getByText } = render(<AccountScreen />);
    expect(getByText("How to use this app:")).toBeTruthy();
    expect(getByText("Journal/Notes")).toBeTruthy();
    expect(getByText("Calendar")).toBeTruthy();
    expect(getByText("Tips and Tricks")).toBeTruthy();
    expect(getByText("Sign Out")).toBeTruthy();
  });

  it("calls the sign out function when the sign out button is clicked", () => {
    const signOut = jest.fn();
    const { getByText } = render(<SignOutButton signOut={signOut} />);
    fireEvent.press(getByText("Sign Out"));
    expect(signOut).toHaveBeenCalled();
  });
});
