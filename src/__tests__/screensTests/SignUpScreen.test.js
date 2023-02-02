import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import SignUpScreen from "./SignUpScreen";
import { useSignUp } from "@clerk/clerk-expo";

jest.mock("@clerk/clerk-expo", () => {
  return {
    useSignUp: jest.fn(() => ({
      isLoaded: true,
      signUp: {
        create: jest.fn(() => Promise.resolve()),
        prepareEmailAddressVerification: jest.fn(() => Promise.resolve()),
      },
    })),
  };
});

describe("SignUpScreen", () => {
  let navigation;

  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      replace: jest.fn(),
    };
  });

  it("should call signUp create with the correct information", async () => {
    const { getByPlaceholderText, getByText } = render(
      <SignUpScreen navigation={navigation} />
    );

    const firstNameInput = getByPlaceholderText("First Name");
    const lastNameInput = getByPlaceholderText("Last Name");
    const emailAddressInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Password");
    const signUpButton = getByText("Sign Up");

    fireEvent.changeText(firstNameInput, "John");
    fireEvent.changeText(lastNameInput, "Doe");
    fireEvent.changeText(emailAddressInput, "john.doe@example.com");
    fireEvent.changeText(passwordInput, "password");

    await act(async () => {
      fireEvent.press(signUpButton);
    });

    expect(useSignUp().signUp.create).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      emailAddress: "john.doe@example.com",
      password: "password",
    });
  });

  it("should call navigation.navigate with the correct information", async () => {
    const { getByPlaceholderText, getByText } = render(
      <SignUpScreen navigation={navigation} />
    );

    const firstNameInput = getByPlaceholderText("First Name");
    const lastNameInput = getByPlaceholderText("Last Name");
    const emailAddressInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Password");
    const signUpButton = getByText("Sign Up");

    fireEvent.changeText(firstNameInput, "John");
    fireEvent.changeText(lastNameInput, "Doe");
    fireEvent.changeText(emailAddressInput, "john.doe@example.com");
    fireEvent.changeText(passwordInput, "password");

    await act(async () => {
      fireEvent.press(signUpButton);
    });

    expect(navigation.navigate).toHaveBeenCalledWith("VerifyCode");
  });

  it("should call sign
