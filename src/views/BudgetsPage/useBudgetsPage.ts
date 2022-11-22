import { useEffect, useState } from "react";

import { RelativeTimeBucket, ReportTypes } from "../../api/report";
import { relativeReport } from "../../api/endpoints";
import { deserializeReportData } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSpendingReport,
  openBudgetPane,
  selectAnalysisPeriod,
  selectBudgetPageState,
  setAnalysisPeriod,
} from "../../store/";

const useBudgetsPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const analysisPeriod = useSelector(selectAnalysisPeriod);

  const reports = useSelector(selectBudgetPageState);

  const addBudget = () => dispatch(openBudgetPane(null));

  const requestReports = async (relativeTimeBucket: RelativeTimeBucket) => {
    const serializedIncomeReport = await relativeReport(
      ReportTypes.BUDGET_INCOME,
      relativeTimeBucket
    );
    const serializedOutcomeReport = await relativeReport(
      ReportTypes.BUDGET_OUTCOME,
      relativeTimeBucket
    );

    dispatch(
      loadSpendingReport({
        analysisPeriod,
        incomeReport: deserializeReportData(serializedIncomeReport),
        outcomeReport: deserializeReportData(serializedOutcomeReport),
      })
    );
  };

  useEffect(() => {
    if (
      reports.incomeReport[analysisPeriod] &&
      reports.outcomeReport[analysisPeriod]
    )
      return;

    setLoading(true);
    requestReports(analysisPeriod).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysisPeriod]);

  return {
    loading,
    analysisPeriod,
    setAnalysisPeriod: (newAnalysisPeriod: RelativeTimeBucket) =>
      dispatch(setAnalysisPeriod(newAnalysisPeriod)),
    addBudget,
  };
};

export default useBudgetsPage;
