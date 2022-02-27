import {
  GraphReport,
  GraphSeries,
  ReportType,
  SerializedBudgetBalanceReport,
  SerializedSingleValueReport,
} from "../types/reports";
import { store } from "../../store/configureStore";
import { fromCents } from "../util";

export function deserializeMultipleValuesReport(
  reportType: ReportType,
  { dates, data }: SerializedBudgetBalanceReport
): GraphReport {
  const state = store.getState();
  const series: GraphSeries[] = [];

  const byId = reportType.name.startsWith("budget")
    ? state.budgets.byId
    : state.tags.byId;

  for (const id in data) {
    series.push({
      name: `${byId[id].name} ${reportType.label}`,
      data: reportType.currency ? data[id].map((x) => fromCents(x)) : data[id],
    });
  }

  return {
    dates: [...dates],
    series,
  };
}

export function deserializeSingleValueReport(
  reportType: ReportType,
  { dates, data }: SerializedSingleValueReport
): GraphReport {
  return {
    dates: [...dates],
    series: [
      {
        name: reportType.label,
        data: reportType.currency ? data.map((x) => fromCents(x)) : data,
      },
    ],
  };
}
