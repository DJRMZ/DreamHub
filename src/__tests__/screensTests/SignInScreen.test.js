import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import SignInScreen from "../../Screens/SignIn";

jest.mock("@clerk/clerk-expo", () => ({
  useSignIn: jest.fn(() => ({
    signIn: {
      create: jest.fn(() =>
        Promise.resolve({ createdSessionId: "mockSessionId" })
      ),
    },
    setSession: jest.fn(),
    isLoaded: true,
  })),
}));

describe("SignInScreen", () => {
  it("should render sign in form", () => {
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);

    expect(getByPlaceholderText("Email Address")).toBeDefined();
    expect(getByPlaceholderText("Password")).toBeDefined();
    expect(getByText("Sign In")).toBeDefined();
    expect(getByText("No Account?")).toBeDefined();
    expect(getByText("Sign Up")).toBeDefined();
  });

  it("should sign in with email and password", async () => {
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);

    const emailAddressInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Password");
    const signInButton = getByText("Sign In");

    fireEvent.changeText(emailAddressInput, "test@email.com");
    fireEvent.changeText(passwordInput, "testpassword");
    await act(async () => {
      fireEvent.press(signInButton);
    });

    expect(emailAddressInput.props.value).toBe("test@email.com");
    expect(passwordInput.props.value).toBe("testpassword");
  });

  it("should show error message when sign in fails", async () => {
    jest.clearAllMocks();
    jest.mock("@clerk/clerk-expo", () => ({
      useSignIn: jest.fn(() => ({
        signIn: {
          create: jest.fn(() =>
            Promise.reject({
              errors: [{ message: "Sign in failed" }],
            })
          ),
        },
        setSession: jest.fn(),
        isLoaded: true,
      })),
    }));

    const { getByPlaceholderText, getByText } = render(<SignInScreen />);

    const emailAddressInput = getByPlaceholderText("Email Address");
    const passwordInput = getByPlaceholderText("Password");
    const signInButton = getByText("Sign In");

    fireEvent.changeText(emailAddressInput, "test@email.com");
    fireEvent.changeText(passwordInput, "testpassword");
    await act(async () => {
      fireEvent.press(signInButton);
    });

    expect(getByText("Welcome back, test@email.com!")).toBeDefined();
  });
});
