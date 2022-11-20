import { SerializedReport } from "../../api/report";
import { BudgetFinancialReport } from "../../store";

export const deserializeReportData = ({
  data: serializedReportData,
}: SerializedReport): BudgetFinancialReport => {
  const flattenReport = (
    acc: BudgetFinancialReport,
    [id, reportData]: [string, number[]]
  ) => {
    acc![parseInt(id)] = reportData[0];
    return acc;
  };

  return Object.entries(serializedReportData).reduce(flattenReport, {});
};
