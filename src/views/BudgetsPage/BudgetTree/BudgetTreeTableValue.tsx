import React, { FunctionComponent } from "react";
import { Grid, Tooltip, Typography } from "@mui/material";
import { formatCurrency } from "../../../util/formatters";

interface Props {
  hideOnSmallScreen?: boolean;
  value: number | string | null;
  color?: string;
  helperText?: string;
  bold?: boolean;
}

const BudgetTreeTableValue: FunctionComponent<Props> = ({
  hideOnSmallScreen = false,
  value,
  color = "text.main",
  helperText,
  bold,
}) => {
  const formattedValue =
    typeof value === "number" ? formatCurrency(value, false, false) : value;
  return (
    <Tooltip title={helperText}>
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
        {bold ? <strong>{formattedValue}</strong> : formattedValue}
      </Grid>
    </Tooltip>
  );
};

export default BudgetTreeTableValue;
