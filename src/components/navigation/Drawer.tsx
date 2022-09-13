import TreeView from "@mui/lab/TreeView";
import { Grid, GridProps, styled, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import { links } from "./constants";
import {
  getCurrentRoute,
  getCurrentRouteId,
  routeWithId,
} from "../../util/routing";
import { useNavigate } from "react-router-dom";
import { getTransparent } from "@fargusplumdoodle/themes/dist/util";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavigationBudgetTreeItem from "./NavigationBudgetTreeItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { ROUTES } from "../../app/AppRoutes";

const GradientBox = styled(Grid)(({ theme }) => ({
  background: `linear-gradient(0deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  height: "100%",
  width: 3,
}));

const Container = styled(Grid)(() => ({
  height: "100%",
}));

const Content = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

interface LinkProps extends GridProps {
  active?: boolean;
}

const Link = styled(Grid, {
  shouldForwardProp: (prop) => prop !== "active",
})<LinkProps>(({ active, theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  borderRadius: "10px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: getTransparent(theme.palette.secondary.main, 0.4),
    color: theme.palette.secondary.contrastText,
  },
  ...(active && {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  }),
}));

const Drawer: FunctionComponent = () => {
  const currentRoute = getCurrentRoute();
  const navigate = useNavigate();
  const rootBudget = useSelector((state: RootState) => state.budgets.root);
  const currentRouteId =
    currentRoute!.path === ROUTES.BUDGET_DETAIL.path && getCurrentRouteId();
  return (
    <Container container direction="row" wrap="nowrap">
      <GradientBox item />
      <Content item container direction="column" spacing={2}>
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
              active={currentRoute!.path === route.path}
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
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected={currentRouteId || ""}
            defaultExpanded={[rootBudget!.id!.toString()]}
            onNodeSelect={(_: any, nodeId: string) =>
              navigate(routeWithId(ROUTES.BUDGET_DETAIL.path, nodeId))
            }
          >
            <NavigationBudgetTreeItem budget={rootBudget!} />
          </TreeView>
        </Grid>
      </Content>
    </Container>
  );
};

export default Drawer;
