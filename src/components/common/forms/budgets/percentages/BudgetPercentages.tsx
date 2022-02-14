import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/configureStore";
import BudgetPercentagesForm from "./BudgetPercentagesForm";

const classes = {
  root: {},
};

type BudgetPercentagesProps = {};

const BudgetPercentages: React.FC<BudgetPercentagesProps> = function ({}) {
  const budgets = useSelector((state: RootState) => state.budgets.list);
  return <BudgetPercentagesForm budgets={budgets} />;
};

export default BudgetPercentages;
