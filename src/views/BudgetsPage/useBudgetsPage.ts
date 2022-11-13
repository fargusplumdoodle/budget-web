import { useEffect, useState } from "react";

import { RelativeTimeBucket, ReportTypes } from "../../api/report";
import { relativeReport } from "../../api/endpoints";
import { deserializeReportData } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSpendingReport,
  selectAnalysisPeriod,
  selectBudgetPageSpendingReportByAnalysisPeriod,
  setAnalysisPeriod,
} from "../../store/";

const useBudgetsPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const analysisPeriod = useSelector(selectAnalysisPeriod);
  const spentThisPeriod = useSelector(
    selectBudgetPageSpendingReportByAnalysisPeriod(analysisPeriod)
  );

  const requestSpentThisPeriod = async (
    relativeTimeBucket: RelativeTimeBucket
  ) => {
    const serializedReport = await relativeReport(
      ReportTypes.BUDGET_DELTA,
      relativeTimeBucket
    );

    dispatch(
      loadSpendingReport({
        analysisPeriod,
        spentThisPeriod: deserializeReportData(serializedReport),
      })
    );
  };

  useEffect(() => {
    if (spentThisPeriod) return;

    setLoading(true);
    requestSpentThisPeriod(analysisPeriod).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analysisPeriod]);

  return {
    loading,
    analysisPeriod,
    setAnalysisPeriod: (newAnalysisPeriod: RelativeTimeBucket) =>
      dispatch(setAnalysisPeriod(newAnalysisPeriod)),
  };
};

export default useBudgetsPage;
