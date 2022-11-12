import {
  Grid, GridProps, styled, Typography,
} from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTransparent } from '@fargusplumdoodle/themes/dist/util';
import { links } from './constants';
import NavigationBudgetTree from '../budget/NavigationBudgetTree';
import useRoute from '../../hooks/useRoute';

const GradientBox = styled(Grid)(({ theme }) => ({
  background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  height: '100%',
  width: 3,
}));

const Container = styled(Grid)(() => ({
  height: '100%',
}));

const Content = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

interface LinkProps extends GridProps {
  active?: boolean;
}

const Link = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'active',
})<LinkProps>(({ active, theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  borderRadius: '10px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: getTransparent(theme.palette.secondary.main, 0.4),
    color: theme.palette.secondary.contrastText,
  },
  ...(active && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  }),
}));

const Drawer: FunctionComponent = () => {
  const currentRoute = useRoute();
  const navigate = useNavigate();
  return (
    <Container container direction="row" wrap="nowrap">
      <GradientBox item />
      <Content item container direction="column" spacing={2} wrap="nowrap">
        <Grid
          item
          component={Typography}
          variant="h2"
          color="primary.main"
          sx={{ paddingBottom: 3 }}
        >
          b
        </Grid>

        <Grid item container direction="column" gap={1}>
          <Grid
            item
            component={Typography}
            variant="subtitle2"
            color="primary.main"
            sx={{ paddingBottom: 1 }}
          >
            ROUTES
          </Grid>
          {links.map((route) => (
            <Link
              item
              container
              key={route.path}
              active={currentRoute?.path === route.path}
              gap={1}
              alignItems="center"
              onClick={() => navigate(route.path)}
            >
              {/* @ts-ignore */}
              <Grid item component={route.icon as React.ReactNode} />
              <Grid item component={Typography}>
                {route.title}
              </Grid>
            </Link>
          ))}
        </Grid>

        <Grid item container direction="column">
          <Grid
            item
            component={Typography}
            variant="subtitle2"
            color="primary.main"
            sx={{ paddingBottom: 1 }}
          >
            BUDGETS
          </Grid>
          <NavigationBudgetTree />
        </Grid>
      </Content>
    </Container>
  );
};

export default Drawer;
