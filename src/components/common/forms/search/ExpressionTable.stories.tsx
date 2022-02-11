import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ExpressionTable from "./ExpressionTable";
import { OPERANDS, OPERATORS } from "./constants";
import { createCallback } from "../../../../util/storybook";

export default {
  title: "Expression Table",
  component: ExpressionTable,
} as ComponentMeta<typeof ExpressionTable>;

const defaultArgs = {
  inputArgs: {},
  operand: OPERANDS.amount,
  operator: OPERATORS.greaterThan,
  onChangeOperand: createCallback("onChangeOperand"),
  onChangeOperator: createCallback("onChangeOperator"),
};

const Template: ComponentStory<typeof ExpressionTable> = function (args) {
  return <ExpressionTable {...defaultArgs} {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
