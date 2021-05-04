// Button.stories.js

import React from "react";

import Button from "./index";

export default {
  title: "Components/Button",
  Component: Button,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
};

const Template = (args) => (
  <Button {...args} onClick={args.onClick}>
    {args.children}
  </Button>
);

export const LargeButton = Template.bind({});
LargeButton.args = {
  children: "LargeButton",
  size: "large",
};
