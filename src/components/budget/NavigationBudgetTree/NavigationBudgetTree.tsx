import React, { FunctionComponent } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRoute } from '../../../hooks';
import { getCurrentRouteId, routeWithId } from '../../../util/routing';
import { ROUTES } from '../../../app/AppRoutes';
import NavigationBudgetTreeItem from './NavigationBudgetTreeItem';
import { Budget, selectBudgetList, selectBudgetRoot } from '../../../store';

const getNodeBudgetIds = (budgets: Budget[]) => budgets.filter((b) => b.isNode).map((b) => b.id!.toString());

const NavigationBudgetTree: FunctionComponent = () => {
  const currentRoute = useRoute();
  const navigate = useNavigate();
  const rootBudget = useSelector(selectBudgetRoot)!;
  const budgets = useSelector(selectBudgetList)!;
  const currentRouteId = currentRoute!.path === ROUTES.BUDGET_DETAIL.path && getCurrentRouteId();
  const defaultExpanded = getNodeBudgetIds(budgets);

  return (
    <TreeView
      aria-label="budget navigation"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={currentRouteId || ''}
      defaultExpanded={defaultExpanded}
      onNodeFocus={(_: any, nodeId: string) => navigate(routeWithId(ROUTES.BUDGET_DETAIL.path, nodeId))}
    >
      <NavigationBudgetTreeItem budget={rootBudget} />
    </TreeView>
  );
};

export default NavigationBudgetTree;
