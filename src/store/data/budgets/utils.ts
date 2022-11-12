import sha1 from 'sha1';
import { Budget } from './types';
import {
  CRUDAction,
  getId,
  makeRequest,
  RequestStatus,
} from '../../communication';
import { BUDGET_ROOT_NAME } from '../../../api/constants';
import { modelById } from '../../utils';

export const getBudgetHash = (budget: Budget): string => {
  const message = `
  ${budget.id! || ''}
  ${budget.name}
  ${budget.parentId}
  ${budget.balance}
  `;
  return sha1(message);
};

export const getBudgetRequest = (
  budget: Budget | null,
  action: CRUDAction,
  status: RequestStatus,
) => makeRequest({
  id: getId('budget', budget || action),
  key: 'budget',
  action,
  status,
});

export const getRootBudget = (budgets: Budget[]): Budget | null => budgets.find((b) => b.name === BUDGET_ROOT_NAME) || null;

export const getBudgetChildren = (
  budget: Budget,
  budgets: Budget[],
): Budget[] => budgets.filter((b) => b.parentId! === budget.id);

export const setBudgetParents = (budgets: Budget[]): Budget[] => {
  const byId = modelById(budgets);
  return budgets.map((budget) => {
    budget.parent = budget.parentId ? byId[budget.parentId] : null;
    return budget;
  });
};
