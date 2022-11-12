import * as React from 'react';
import Header from '../components/navigation/Header';
import './App.css';
import AppRoutes from './AppRoutes';
import { Grid, styled } from '@mui/material';
import ResponsiveDrawer from '../components/navigation/ResponsiveDrawer';

const Content = styled(Grid)(({ theme }) => ({
  padding: `0 ${theme.spacing(3)}`,
  flexGrow: 1,
  maxWidth: 1500,
  marginLeft: 'auto',
  marginRight: 'auto',
}));

const App: React.FunctionComponent = () => (
  <Grid container direction="row" wrap="nowrap">
    <ResponsiveDrawer />

    <Grid item container gap={1} xs>
      <Grid item component={Header} />
      <Content item>
        <AppRoutes />
      </Content>
    </Grid>
  </Grid>
);

export default App;
