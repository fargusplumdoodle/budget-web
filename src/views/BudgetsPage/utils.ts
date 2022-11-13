import { SerializedReport } from "../../api/report";
import { SpentThisPeriodReport } from "../../store";

export const deserializeReportData = ({
  data: serializedReportData,
}: SerializedReport): SpentThisPeriodReport => {
  const flattenReport = (
    acc: SpentThisPeriodReport,
    [id, reportData]: [string, number[]]
  ) => {
    acc![parseInt(id)] = reportData[0];
    return acc;
  };

  return Object.entries(serializedReportData).reduce(flattenReport, {});
};
