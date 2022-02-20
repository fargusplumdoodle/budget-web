import {
  BudgetBalanceReport,
  GraphSeries,
  SerializedBudgetBalanceReport,
} from "../types/reports";
import { store } from "../../store/configureStore";

export function deserializeBudgetBalanceReport(
  report: SerializedBudgetBalanceReport
): BudgetBalanceReport {
  const budgets = store.getState().budgets;
  const series: GraphSeries[] = [];

  for (const budgetId in report.data) {
    series.push({
      name: budgets.byId[budgetId].name,
      data: report.data[budgetId],
    });
  }

  return {
    dates: report.dates,
    series,
  };
}
