import React from "react";
import { mount } from "enzyme";
import RangeCounterA from "./RangeCounterA";

describe("RangeCounterA", () => {
  let component;

  beforeEach(() => {
    component = mount(<RangeCounterA />);
  });

  it("does not show range reached alert on initial load", () => {
    const alert = component.find(".RangeCounter__alert");
    expect(alert).toHaveLength(0);
  });

  it("shows range reached alert when reached limit by clicking control buttons", () => {
    component = mount(<RangeCounterA min={0} max={1} />);
    component.instance().incrementCounter();
    component.update();
    const alert = component.find(".RangeCounter__alert");
    expect(alert.text()).toEqual("Range limit reached!");
  });

  describe("when incrementing counter is allowed", () => {
    it("updates counter value correctly", () => {
      component.instance().incrementCounter();
      expect(component.state().counter).toEqual(1);
      expect(component.state().hasEdited).toEqual(true);
    });
  });

  describe("when incrementing counter is not allowed", () => {
    it("does not update counter value", () => {
      const instance = component.instance();
      instance.setState({ counter: 10 });
      instance.incrementCounter();
      expect(component.state().counter).toEqual(10);
      expect(component.state().hasEdited).toEqual(true);
    });
  });

  describe("when decrementing counter is allowed", () => {
    it("updates counter value correctly", () => {
      const instance = component.instance();
      instance.setState({ counter: 10 });
      instance.decrementCounter();
      expect(component.state().counter).toEqual(9);
      expect(component.state().hasEdited).toEqual(true);
    });
  });

  describe("when decrementing counter is not allowed", () => {
    it("does not update counter value", () => {
      const instance = component.instance();
      instance.decrementCounter();
      expect(component.state().counter).toEqual(0);
      expect(component.state().hasEdited).toEqual(false);
    });
  });
});
