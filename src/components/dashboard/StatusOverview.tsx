import * as React from "react";
import { FunctionComponent } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { sum } from "lodash";
import { formatCurrency } from "../../util/formatters";

interface OwnProps {}

type Props = OwnProps;

const StatusOverview: FunctionComponent<Props> = () => {
  const budgets = useSelector((state: RootState) => state.budgets.list);
  const totalBudgetBalance = sum(budgets.map((budget) => budget.balance));
  return (
    <Grid>
      <Grid item>
        <h1>{formatCurrency(totalBudgetBalance, false)}</h1>
      </Grid>
    </Grid>
  );
};

export default StatusOverview;
