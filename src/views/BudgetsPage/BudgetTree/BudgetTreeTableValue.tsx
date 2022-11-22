import React, { FunctionComponent } from "react";
import { Grid, Typography } from "@mui/material";
import { formatCurrency } from "../../../util/formatters";

interface Props {
  hideOnSmallScreen?: boolean;
  value: number | string | null;
  color?: string;
}

const BudgetTreeTableValue: FunctionComponent<Props> = ({
  hideOnSmallScreen = false,
  value,
  color = "text.main",
}) => {
  const formattedValue =
    typeof value === "number" ? formatCurrency(value, false, false) : value;
  return (
    <Grid
      item
      component={Typography}
      variant="caption"
      textAlign="center"
      color={color}
      sx={(theme) => ({
        width: 100,
        [theme.breakpoints.down("sm")]: {
          width: "auto",
          ...(hideOnSmallScreen && { display: "none" }),
        },
      })}
    >
      {formattedValue}
    </Grid>
  );
};

export default BudgetTreeTableValue;
