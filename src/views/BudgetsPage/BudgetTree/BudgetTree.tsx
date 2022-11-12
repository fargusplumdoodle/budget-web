import React from 'react';
import { TreeView } from '@mui/lab';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import BudgetTreeItem from './BudgetTreeItem';
import { routeWithId } from '../../../util/routing';
import { ROUTES } from '../../../app/AppRoutes';
import {
  Budget,
  selectBudgetList,
  selectBudgetRoot,
  selectBudgetsById,
} from '../../../store';

function BudgetTree() {
  const budgets = useSelector(selectBudgetList);
  const budgetsById = useSelector(selectBudgetsById);
  const rootBudget = useSelector(selectBudgetRoot);
  const navigate = useNavigate();
  return (
    <TreeView
      aria-label="budget navigation"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      defaultExpanded={[rootBudget!.id!.toString()]}
      disableSelection
      disabledItemsFocusable
    >
      <BudgetTreeItem budget={rootBudget!} budgets={budgets} />
    </TreeView>
  );
}

export default BudgetTree;
