import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import PaginatedTransactionsTable from "./PaginatedTransactionsTable";
import {
  createCallback,
  createSampleTransactions,
} from "../../../util/storybook";
import { Card } from "@mui/material";

export default {
  title: "Paginated Transactions Table",
  component: PaginatedTransactionsTable,
} as ComponentMeta<typeof PaginatedTransactionsTable>;

const defaultArgs = {
  transactions: createSampleTransactions(),
  showBudget: true,
  onCreateCallback: createCallback("create"),
  onUpdateCallback: createCallback("update"),
  onDeleteCallback: createCallback("delete"),
};

const Template: ComponentStory<typeof PaginatedTransactionsTable> = function (
  args
) {
  return (
    <Card>
      <PaginatedTransactionsTable {...defaultArgs} {...args} />;
    </Card>
  );
};

export const Default = Template.bind({});
Default.args = {
  showBudget: true,
};
