import { RootState } from "../../../types";
import { selectReportState } from "../selectors";
import { BudgetFinancialReport, BudgetsPageReportState } from "./types";
import { RelativeTimeBucket } from "../../../../api/report";
import { Budget } from "../../budgets";

export const selectBudgetPageState = (
  state: RootState
): BudgetsPageReportState => selectReportState(state).budgetsPage;

export const selectBudgetPageIncomeReport =
  (analysisPeriod: RelativeTimeBucket, budget: Budget) =>
  (state: RootState): number | undefined =>
    selectBudgetPageState(state).incomeReport[analysisPeriod]?.[budget.id!];

export const selectBudgetPageOutcomeReport =
  (analysisPeriod: RelativeTimeBucket, budget: Budget) =>
  (state: RootState): number | undefined =>
    selectBudgetPageState(state).outcomeReport[analysisPeriod]?.[budget.id!];
