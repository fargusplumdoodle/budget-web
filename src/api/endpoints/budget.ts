import { makeRequest } from '../util';
import { SerializedBudget } from '../types';
import {
  deserializeBudget,
  deserializeBudgets,
  serializeBudget,
} from '../serializers';
import { Budget } from '../../store/data/budgets/types';
import { BUDGET_ROOT_NAME } from '../constants';

export async function receiveBudgets(): Promise<Budget[]> {
  const r = await makeRequest({
    method: 'get',
    url: '/api/v2/budget/',
  });

  return deserializeBudgets(r!.data as SerializedBudget[]);
}

export async function updateBudget(budget: Budget): Promise<Budget> {
  const r = await makeRequest({
    method: 'put',
    url: `/api/v2/budget/${budget.id}/`,
    data: serializeBudget(budget),
  });
  return deserializeBudget(r!.data as SerializedBudget);
}

export async function createBudget(budget: Budget): Promise<Budget> {
  const r = await makeRequest({
    method: 'post',
    url: '/api/v2/budget/',
    data: serializeBudget(budget),
  });
  return deserializeBudget(r!.data as SerializedBudget);
}

export async function deleteBudget(budget: Budget): Promise<void> {
  if (budget.name === BUDGET_ROOT_NAME) throw Error('Cannot delete root budget');

  if (budget.isNode) throw Error('Cannot delete node budget');

  await makeRequest({
    method: 'delete',
    url: `/api/v2/budget/${budget.id}/`,
  });
}
