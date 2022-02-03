import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PaginatedTransactionsTable from "./PaginatedTransactionsTable";
import { range } from "lodash";
import { generateTestTransaction } from "../../../util/generators";
import { Transaction } from "../../../store/types/models";

export default {
  title: "Paginated Transactions Table",
  component: PaginatedTransactionsTable,
} as ComponentMeta<typeof PaginatedTransactionsTable>;

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

const Template: ComponentStory<typeof PaginatedTransactionsTable> = function (
  args
) {
  return <PaginatedTransactionsTable {...defaultArgs} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  showBudget: true,
};
