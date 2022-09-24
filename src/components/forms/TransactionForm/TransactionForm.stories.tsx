import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TransactionForm from "./TransactionForm";
import budgets from "../../../__fixtures__/budgets";
import { Transaction } from "../../../store/models/types";
import { stateDecorator } from "../../../__fixtures__/decorators";

export default {
  title: "TransactionForm",
  component: TransactionForm,
  decorators: [stateDecorator()],
} as ComponentMeta<typeof TransactionForm>;

const initialTransaction: Transaction = {
  id: null,
  amount: -50,
  description: "",
  budget: budgets.byName.doritos,
  date: new Date(),
  income: false,
  transfer: false,
  tags: [],
};

const Template: ComponentStory<typeof TransactionForm> = () => {
  const [transaction, setTransaction] = useState({ ...initialTransaction });
  return (
    <TransactionForm transaction={transaction} onSubmit={setTransaction} />
  );
};

export const Default = Template.bind({});
Default.args = {};
