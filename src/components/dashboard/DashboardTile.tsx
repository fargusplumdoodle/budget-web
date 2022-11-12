import { Card, SxProps, Typography } from '@mui/material';
import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';

interface OwnProps {
  title?: string;
  description?: string;
  children: ReactElement[] | ReactElement;
  small?: boolean;
  sx?: SxProps;
}

type Props = OwnProps;

const DashboardTile: FunctionComponent<Props> = (props) => {
  const title = props.title ? (
    <Typography variant="h5" sx={{ padding: '2px 4px', m: 0 }}>
      {props.title}
    </Typography>
  ) : (
    <></>
  );
  return (
    <Card
      sx={{
        p: 1,
        minWidth: 400,
        opacity: '0.8',
        backdropFilter: 'blur(5px)',
        ...props.sx,
      }}
    >
      {title}
      {props.children}
    </Card>
  );
};

export default DashboardTile;
