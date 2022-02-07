import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import VariableInputForm from "./VariableInputForm";
import AppProvider from "../../../../app/AppProvider";
import { createCallback } from "../../../../util/storybook";

export default {
  title: "Variable Input Form",
  component: VariableInputForm,
} as ComponentMeta<typeof VariableInputForm>;

const defaultArgs = {
  onSubmit: createCallback("onSubmit Variable InputForm"),
};

const Template: ComponentStory<typeof VariableInputForm> = function (args) {
  return (
    <AppProvider>
      <VariableInputForm {...defaultArgs} {...args} />
    </AppProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};
