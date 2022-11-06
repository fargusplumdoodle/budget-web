import React, { FunctionComponent } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  getCurrentRoute,
  getCurrentRouteId,
  routeWithId,
} from "../../../util/routing";
import { ROUTES } from "../../../app/AppRoutes";
import NavigationBudgetTreeItem from "./NavigationBudgetTreeItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBudgetRoot } from "../../../store";

const NavigationBudgetTree: FunctionComponent = () => {
  const currentRoute = getCurrentRoute();
  const navigate = useNavigate();
  const rootBudget = useSelector(selectBudgetRoot)!;
  const currentRouteId =
    currentRoute!.path === ROUTES.BUDGET_DETAIL.path && getCurrentRouteId();
  return (
    <TreeView
      aria-label="budget navigation"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={currentRouteId || ""}
      defaultExpanded={[rootBudget.id!.toString()]}
      onNodeSelect={(_: any, nodeId: string) =>
        navigate(routeWithId(ROUTES.BUDGET_DETAIL.path, nodeId))
      }
    >
      <NavigationBudgetTreeItem budget={rootBudget} />
    </TreeView>
  );
};

export default NavigationBudgetTree;
