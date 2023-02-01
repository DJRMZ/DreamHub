import React from "react";
import { render, fireEvent } from "react-native-testing-library";
import SignOutButton from "./SignOutButton";
import { useClerk } from "@clerk/clerk-expo/dist";

jest.mock("@clerk/clerk-expo/dist", () => ({
  useClerk: jest.fn(() => ({
    signOut: jest.fn(),
  })),
}));

describe("SignOutButton", () => {
  it("calls signOut when button is pressed", () => {
    const { signOut } = useClerk();
    const { getByText } = render(<SignOutButton />);
    fireEvent.press(getByText("Sign Out"));
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
