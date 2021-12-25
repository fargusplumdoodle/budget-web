import { Box, Card, Popover, Typography } from "@mui/material";
import * as React from "react";
import "./DashboardTile.css";
import { FunctionComponent, ReactElement } from "react";
import { Info } from "@mui/icons-material";

interface OwnProps {
  title?: string;
  description?: string;
  children: ReactElement[] | ReactElement;
  small?: boolean;
}

type Props = OwnProps;

const DashboardTile: FunctionComponent<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const title = props.title ? (
    <h5 className="dashboardTileTitleItem">{props.title}</h5>
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
