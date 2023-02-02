import React from "react";
import { render, cleanup } from "@testing-library/react";
import DreamLogger from "../../Screens/DreamLogger";

afterEach(cleanup);

it("renders the DreamLogger component", () => {
  const { getByTestId } = render(<DreamLogger />);
  expect(getByTestId("dream-logger")).toBeTruthy();
});
