import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TransactionsTable from "./TransactionsTable";
import { range } from "lodash";
import { generateTestTransaction } from "../../../util/generators";
import { Transaction } from "../../../store/types/models";

export default {
  title: "Transactions Table",
  component: TransactionsTable,
} as ComponentMeta<typeof TransactionsTable>;

const exampleTransactions = range(100).map(() => generateTestTransaction());
const createCallback = function (name: string) {
  return (trans: Transaction) => {
    alert(`Called ${name} callback!`);
    console.log(`Callback: ${name}`, trans);
  };
};

const defaultArgs = {
  transactions: exampleTransactions,
  showBudget: true,
  onCreateCallback: createCallback("create"),
  onUpdateCallback: createCallback("update"),
  onDeleteCallback: createCallback("delete"),
};

const Template: ComponentStory<typeof TransactionsTable> = function (args) {
  return <TransactionsTable {...defaultArgs} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  showBudget: true,
};
