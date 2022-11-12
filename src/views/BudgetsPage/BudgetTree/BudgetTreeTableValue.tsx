import React, { FunctionComponent } from "react";
import { Grid, Typography } from "@mui/material";

interface Props {
  hideOnSmallScreen?: boolean;
  value: number | string | null;
}

const BudgetTreeTableValue: FunctionComponent<Props> = ({
  hideOnSmallScreen = false,
  value,
}) => {
  const formattedValue = typeof value === "number" ? Math.round(value) : value;
  return (
    <Grid
      item
      component={Typography}
      variant="caption"
      textAlign="center"
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
