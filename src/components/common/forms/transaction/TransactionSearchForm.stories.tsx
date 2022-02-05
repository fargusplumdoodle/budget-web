import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TransactionSearchForm from "./TransactionSearchForm";
import {
  createCallback,
  createSampleTransactions,
} from "../../../../util/storybook";

export default {
  title: "Transactions Search Form",
  component: TransactionSearchForm,
} as ComponentMeta<typeof TransactionSearchForm>;

const defaultArgs = {
  transactions: createSampleTransactions,
  showBudget: true,
  onCreateCallback: createCallback("create"),
  onUpdateCallback: createCallback("update"),
  onDeleteCallback: createCallback("delete"),
};

const Template: ComponentStory<typeof TransactionSearchForm> = function (args) {
  return <TransactionSearchForm {...defaultArgs} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  showBudget: true,
};
