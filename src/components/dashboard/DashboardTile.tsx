import { Box, Card, Popover, Typography } from "@mui/material";
import * as React from "react";
import { FunctionComponent, ReactElement } from "react";
import { Info } from "@mui/icons-material";

interface OwnProps {
  title?: string;
  description?: string;
  child: ReactElement;
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

  const buildInfoTag = () => {
    if (!props.description) {
      return <></>;
    }
    return (
      <>
        <Typography
          sx={{ p: 3.5 }}
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        >
          <Info />
        </Typography>
        <Popover open={open} sx={{ pointerEvents: "none" }} anchorEl={anchorEl}>
          <Typography variant={"h5"} sx={{ p: 1 }}>
            {props.description}
          </Typography>
        </Popover>
      </>
    );
  };

  const title = props.title ? <h3>{props.title}</h3> : <></>;

  return (
    <Card sx={{ p: 1, maxHeight: 500 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignSelf: "center",
          width: "100%",
        }}
      >
        {title}
        {buildInfoTag()}
      </Box>
      {props.child}
    </Card>
  );
};

export default DashboardTile;
