import * as React from "react";
import { Budget } from "../../../../../store/types/models";
import BudgetPercentagesTable from "./BudgetPercentagesTable";
import { EXPECTED_BUDGETS } from "../../../../../app/settings";

import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { updateValuesList } from "../../../../../util/state";
import { sum } from "lodash";
import BudgetPercentageSummary from "./BudgetPercentageSummary";

const classes = {
  formFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 2,
  },
  percentageSummary: { m: 1 },
};

type BudgetPercentagesFormProps = {
  budgets: Budget[];
  onSubmit: (budgets: Budget[]) => void;
  loading: boolean;
};

const BudgetPercentagesForm: React.FC<BudgetPercentagesFormProps> = function ({
  onSubmit,
  loading,
  ...props
}) {
  const [budgets, setBudgets] = useState([...props.budgets]);
  const savings = budgets.find((b) => b.name === EXPECTED_BUDGETS.SAVINGS);
  const notSavingsBudgets = budgets.filter(
    (b) => b.name !== EXPECTED_BUDGETS.SAVINGS
  );
  const savingsPercentage =
    100 - sum(notSavingsBudgets.map((b) => b.percentage));
  useEffect(() => {
    const newSavings = {
      ...savings,
      percentage: savingsPercentage,
    };
    updateValuesList(newSavings, budgets, setBudgets);
  }, [savingsPercentage, budgets, savings]);

  return (
    <form>
      <BudgetPercentagesTable
        budgets={notSavingsBudgets}
        updateBudget={(budget) => updateValuesList(budget, budgets, setBudgets)}
        maximumPercentageAllocated={savingsPercentage <= 0}
      />

      <Box sx={classes.formFooter}>
        <BudgetPercentageSummary
          budgets={budgets}
          sx={classes.percentageSummary}
        />
        <Button disabled={loading} onClick={() => onSubmit([...budgets])}>
          {loading ? <CircularProgress /> : "SUBMIT"}
        </Button>
      </Box>
    </form>
  );
};

export default BudgetPercentagesForm;
