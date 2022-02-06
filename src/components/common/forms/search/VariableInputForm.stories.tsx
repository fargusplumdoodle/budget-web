import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import VariableInputForm from "./VariableInputForm";

export default {
  title: "Variable Input Form",
  component: VariableInputForm,
} as ComponentMeta<typeof VariableInputForm>;

const defaultArgs = {};

const Template: ComponentStory<typeof VariableInputForm> = function (args) {
  return <VariableInputForm {...defaultArgs} {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
