import { SerializedReport } from "../../api/report";
import { SpentThisPeriod } from "./BudgetPageContext";

export const deserializeReportData = ({
  data: serializedReportData,
}: SerializedReport): SpentThisPeriod => {
  const flattenReport = (
    acc: SpentThisPeriod,
    [id, reportData]: [string, number[]]
  ) => {
    acc[parseInt(id)] = reportData[0];
    return acc;
  };

  return Object.entries(serializedReportData).reduce(flattenReport, {});
};
