import * as React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import { Card, Typography } from "@mui/material";
import GraphContainer from "../components/graph/GraphContainer";
import { ReportTypes } from "../api/types";
import { DateTime } from "luxon";

const BudgetDetailPage: React.FC = function () {
  const { id } = useParams();
  const budget = useSelector(
    (state: RootState) => state.budgets.byId[parseInt(id)]
  );
  if (!budget) {
    return <Typography variant="h1">ooof, can't find that one</Typography>;
  }

  const queryParams = new URLSearchParams();
  queryParams.set("budget__includes", budget.id.toString());
  queryParams.set("date__gte", DateTime.now().minus({ months: 6 }).toISODate());
  queryParams.set("date__lte", DateTime.now().toISODate());

  return (
    <Card>
      <h1>Budget: {budget.name}</h1>

      <GraphContainer
        reportTypes={[ReportTypes.BUDGET_BALANCE, ReportTypes.BUDGET_DELTA]}
        timeBucketSize="one_day"
        queryParams={queryParams}
      />
    </Card>
  );
};

export default BudgetDetailPage;
