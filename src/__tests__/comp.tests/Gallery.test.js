import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Gallery from "../../Components/Gallery";

describe("Gallery", () => {
  it("should render all images and title/description elements", () => {
    const { getByTestId } = render(<Gallery />);

    DATA.forEach(({ title, description, image }, i) => {
      const imageElement = getByTestId(`image-${i}`);
      const titleElement = getByTestId(`title-${i}`);
      const descriptionElement = getByTestId(`description-${i}`);

      expect(imageElement).toBeTruthy();
      expect(titleElement.props.children).toEqual(title);
      expect(descriptionElement.props.children).toEqual(description);
    });
  });

  it("should change background color as the images scroll", () => {
    const { getByTestId } = render(<Gallery />);

    const flatList = getByTestId("flat-list");

    fireEvent.scroll(flatList, {
      nativeEvent: {
        contentOffset: { x: width },
      },
    });

    const backdrop = getByTestId("backdrop");
    expect(backdrop.props.style[1].backgroundColor).toEqual(bgs[1]);
  });
});
