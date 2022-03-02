import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import BudgetPercentagesForm from "./BudgetPercentagesForm";
import { Budget } from "../../../../store/types/models";
import ApiErrorDialog, { ApiError } from "../../../ApiErrorDialog";
import { useState } from "react";
import { ProviderContext, withSnackbar } from "notistack";
import api from "../../../../api";

interface BudgetPercentagesProps extends ProviderContext {}

function everyItemInArrayIsFalse(array: boolean[]) {
  let output = false;
  array.forEach((b) => {
    output = b || output;
  });
  return output;
}

const BudgetPercentages: React.FC<BudgetPercentagesProps> = function ({
  enqueueSnackbar,
}) {
  const budgets = useSelector((state: RootState) => state.budgets.list);

  const defaultLoadingState = Object.fromEntries(
    budgets.map((b) => [b.id, false])
  );
  const [budgetLoadingMap, setBudgetLoadingMap] = useState(defaultLoadingState);
  const [apiError, setApiError] = useState<ApiError>(null);
  const loading = everyItemInArrayIsFalse(Object.values(budgetLoadingMap));

  const onSubmit = function (budgets: Budget[]) {
    setBudgetLoadingMap(Object.fromEntries(budgets.map((b) => [b.id, true])));

    budgets.forEach((budget) => {
      api.budget
        .updateBudget(budget)
        .then((budget: Budget) => {
          budgetLoadingMap[budget.id] = false;
          setBudgetLoadingMap({ ...budgetLoadingMap });
          enqueueSnackbar(
            `Successfully updated ${budget.name} to ${budget.percentage}`,
            {
              variant: "success",
            }
          );
        })
        .catch((err) => {
          budgetLoadingMap[budget.id] = false;
          setBudgetLoadingMap({ ...budgetLoadingMap });
          setApiError(err);
        });
    });
  };

  return (
    <>
      <BudgetPercentagesForm
        budgets={budgets}
        onSubmit={onSubmit}
        loading={loading}
      />

      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
        }}
      />
    </>
  );
};

export default withSnackbar(BudgetPercentages);
