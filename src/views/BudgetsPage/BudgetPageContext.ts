import React from "react";
import { RelativeTimeBucketOption } from "../../api/report";
import { defaultBudgetPageContext } from "./constants";

export interface SpentThisPeriod {
  [budgetId: number]: number;
}

export interface BudgetsPageContextType {
  analysisPeriod: RelativeTimeBucketOption;
  spentThisPeriod: SpentThisPeriod;
}

const BudgetsPageContext = React.createContext<BudgetsPageContextType>(
  defaultBudgetPageContext
);

export default BudgetsPageContext;
