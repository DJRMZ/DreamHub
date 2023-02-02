import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import {
  Home,
  DreamLogger,
  Account,
  SignIn,
  SignUp,
} from "../../Screens/index";

describe("Exported components", () => {
  it("renders the Home component", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Welcome to DreamHub!")).toBeTruthy();
  });

  it("renders the DreamLogger component", () => {
    const { getByText } = render(<DreamLogger />);
    expect(getByText("Dream Logger")).toBeTruthy();
  });

  it("renders the Account component", () => {
    const { getByText } = render(<Account />);
    expect(getByText("Account Information")).toBeTruthy();
  });

  it("renders the SignIn component", () => {
    const { getByText } = render(<SignIn />);
    expect(getByText("Sign In")).toBeTruthy();
  });

  it("renders the SignUp component", () => {
    const { getByText } = render(<SignUp />);
    expect(getByText("Sign Up")).toBeTruthy();
  });
});
