import { Budget, Transaction } from "../store/models/types";
import { store } from "../store/configureStore";
import { sum } from "lodash";
import { IncomeFormData } from "../components/forms/transaction/IncomeForm";

export function getIncomeTransactionAmount(
  totalAmount: number,
  budgetPercentage: number
): number {
  const unrounded = totalAmount * (budgetPercentage / 100);
  return Math.floor(unrounded * 100) / 100;
}

export function getUnallocatedAmount(
  totalAmount: number,
  transactionAmounts: number[]
): number {
  const allocated = sum(transactionAmounts);
  if (allocated !== totalAmount) {
    return totalAmount - allocated;
  }
  return 0;
}

export function createIncomeTransactions({
  amount,
  description,
  date,
}: IncomeFormData): Transaction[] {
  const state = store.getState();
  const budgets = state.budgets.list;
  const incomeTag = state.tags.byName["income"];

  const transactions: Transaction[] = budgets
    .filter((budget: Budget) => budget.percentage > 0)
    .map((budget: Budget) => {
      return {
        id: null,
        amount: getIncomeTransactionAmount(amount, budget.percentage),
        description,
        budget: budget,
        date,
        income: true,
        transfer: false,
        tags: [incomeTag],
      };
    });

  const unallocatedAmount = getUnallocatedAmount(
    amount,
    transactions.map((t) => t.amount)
  );
  if (unallocatedAmount !== 0) {
    transactions.push({
      id: null,
      amount: unallocatedAmount,
      description: "unallocatable income dollars",
      budget: state.budgets.byName["savings"],
      date,
      income: true,
      transfer: false,
      tags: [incomeTag],
    });
  }

  return transactions;
}
