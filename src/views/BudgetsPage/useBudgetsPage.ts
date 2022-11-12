import { useEffect, useState } from "react";
import { BudgetsPageContextType } from "./BudgetPageContext";
import { defaultBudgetPageContext } from "./constants";
import {
  RELATIVE_TIME_BUCKETS_OPTIONS,
  RelativeTimeBucket,
  RelativeTimeBucketOption,
  ReportTypes,
} from "../../api/report";
import { relativeReport } from "../../api/endpoints";
import { deserializeReportData } from "./utils";

const useBudgetsPage = () => {
  const [loading, setLoading] = useState(false);
  const [context, setContext] = useState<BudgetsPageContextType>(
    defaultBudgetPageContext
  );
  const { analysisPeriod } = context;

  const requestSpentThisPeriod = async (
    relativeTimeBucket: RelativeTimeBucket
  ) => {
    const serializedReport = await relativeReport(
      ReportTypes.BUDGET_DELTA,
      relativeTimeBucket
    );

    setContext({
      ...context,
      spentThisPeriod: deserializeReportData(serializedReport),
    });
  };

  useEffect(() => {
    setLoading(true);
    requestSpentThisPeriod(analysisPeriod.value).then(() => {
      setLoading(false);
    });
  }, [analysisPeriod]);

  const setAnalysisPeriod = (newAnalysisPeriod: RelativeTimeBucketOption) => {
    setContext({
      ...context,
      analysisPeriod: newAnalysisPeriod,
    });
  };
  return {
    loading,
    context,
    analysisPeriod,
    setAnalysisPeriod,
  };
};

export default useBudgetsPage;
