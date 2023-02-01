// import DreamCalendar from "./DreamCalendar";
// import DreamCalendar from "../../Components/DreamCalendar";
const DreamCalendar = require("../../Components/DreamCalendar");

describe("DreamCalendar component", () => {
  it("should load items", async () => {
    const component = shallow(<DreamCalendar />);
    const instance = component.instance();

    instance.loadItems({ timestamp: 1618631600000 });

    await waitFor(() => {
      expect(component.state().items).not.toEqual({});
    });
  });

  it("should render an item correctly", () => {
    const component = shallow(<DreamCalendar />);
    const instance = component.instance();

    const item = { name: "Item 1", height: 100 };
    const result = instance.renderItem(item);

    expect(result).toMatchSnapshot();
  });

  it("should render an empty date correctly", () => {
    const component = shallow(<DreamCalendar />);
    const instance = component.instance();

    const result = instance.renderEmptyDate();

    expect(result).toMatchSnapshot();
  });
});
