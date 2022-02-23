import { Card, Typography } from "@mui/material";
import * as React from "react";
import { FunctionComponent, ReactElement } from "react";

interface OwnProps {
  title?: string;
  description?: string;
  children: ReactElement[] | ReactElement;
  small?: boolean;
}

type Props = OwnProps;

const DashboardTile: FunctionComponent<Props> = (props) => {
  const title = props.title ? (
    <Typography variant="h5" sx={{ padding: "2px 4px", m: 0 }}>
      {props.title}
    </Typography>
  ) : (
    <></>
  );
  const height = props.small ? 500 / 3 : 500;

  return (
    <Card sx={{ p: 1, height: height }}>
      {title}
      {props.children}
    </Card>
  );
};

export default DashboardTile;
