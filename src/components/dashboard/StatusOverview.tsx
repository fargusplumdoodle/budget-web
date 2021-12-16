import * as React from "react";
import { FunctionComponent } from "react";
import { Grid } from "@mui/material";

interface OwnProps {}

type Props = OwnProps;

const StatusOverview: FunctionComponent<Props> = (props) => {
  return (
    <Grid>
      <Grid item>
        <h1>30, 000</h1>
      </Grid>
    </Grid>
  );
};

export default StatusOverview;
