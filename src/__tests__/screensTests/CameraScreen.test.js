import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import CameraScreen from "../../Screens/Camera";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

jest.mock("expo-media-library", () => {
  return {
    requestPermissionAsync: jest.fn(() => Promise.resolve()),
    createAssetAsynce: jest.fn(() => Promise.resolve()),
  };
});

jest.mock("expo-permissions", () => {
  return {
    askAsync: jest.fn(() => Promise.resolve({ status: "granted" })),
  };
});

jest.mock("expo-camera", () => {
  return {
    requestCameraPermissionAsync: jest.fn(() =>
      Promise.resolve({ status: "granted" })
    ),
  };
});

describe("CameraScreen", () => {
  it("renders the camera by default", async () => {
    const { queryByText, getByText } = render(<CameraScreen />);
    expect(queryByText("No access to camera")).toBeNull();
    expect(getByText("Take a picture")).toBeDefined();
  });

  it("renders a message if no camera permission", async () => {
    Permissions.askAsync.mockImplementationOnce(() =>
      Promise.resolve({ status: "denied" })
    );

    const { getByText } = render(<CameraScreen />);
    expect(getByText("No access to camera")).toBeDefined();
  });

  it("takes a picture when the 'Take a picture' button is pressed", async () => {
    const { getByText } = render(<CameraScreen />);
    const takePictureButton = getByText("Take a picture");
    act(() => {
      fireEvent.press(takePictureButton);
    });
    expect(Camera.takePictureAsync).toHaveBeenCalled();
  });

  it("displays the taken picture when a picture is taken", async () => {
    const { getByTestId, getByText } = render(<CameraScreen />);
    const takePictureButton = getByText("Take a picture");
    act(() => {
      fireEvent.press(takePictureButton);
    });
    expect(getByTestId("image")).toBeDefined();
    expect(getByText("Re-take")).toBeDefined();
    expect(getByText("Save")).toBeDefined();
  });

  it("saves the picture when the 'Save' button is pressed", async () => {
    const { getByText } = render(<CameraScreen />);
    const takePictureButton = getByText("Take a picture");
    act(() => {
      fireEvent.press(takepictureButton);
    });
    const savePictureButton = getByText("Save");
    act(() => {
      fireEvent.press(savePictureButton);
    });
    expect(CameraRoll.saveToCameraRoll).toHaveBeenCalled();
  });
});
