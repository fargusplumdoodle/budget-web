import React, { FunctionComponent } from "react";
import { FormProvider, useController, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { Budget } from "../../../store";
import { budgetFromBudgetForm, getDefaultFormValues } from "./util";
import { budgetFormSchema } from "./schema";
import { BudgetFormType } from "./type";
import { AllocationInput, BudgetInput } from "../../inputs";
import TextInput from "../../inputs/TextInput";
import { BUDGET_ROOT_NAME } from "../../../api/constants";
import IsNodeSwitchInput from "./IsNodeSwitchInput";
import BudgetAllocationInput from "./BudgetAllocationInput";

interface Props {
  isNewBudget: boolean;
  budget: Budget | null;
  onSubmit: (budget: Budget) => void;
  loading: boolean;
}

const BudgetForm: FunctionComponent<Props> = ({
  isNewBudget,
  budget,
  onSubmit,
  loading,
}) => {
  const isRootBudget = budget?.name === BUDGET_ROOT_NAME;
  const formMethods = useForm({
    resolver: yupResolver(budgetFormSchema),
    defaultValues: getDefaultFormValues(budget),
    mode: "onSubmit",
  });

  const handleSubmit = (budgetForm: BudgetFormType) => {
    const budget = budgetFromBudgetForm(budgetForm);
    onSubmit(budget);
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <Grid container direction="column" gap={1}>
            <Grid
              item
              container
              wrap="nowrap"
              justifyContent="space-between"
              alignItems="center"
              marginBottom={1}
            >
              <Grid item component={Typography} variant="body1">
                {isNewBudget ? "Edit" : "Add"} Budget
              </Grid>
              {loading ? (
                <Grid item component={CircularProgress} size={24} />
              ) : (
                <Grid item component={Typography} variant="body1">
                  <IsNodeSwitchInput disabled={!isNewBudget} />
                </Grid>
              )}
            </Grid>
            {isRootBudget && (
              <Grid item component={Alert} severity="info">
                The Root budget cannot be modified
              </Grid>
            )}
            <Grid item>
              <TextInput
                fieldName="name"
                label="Name"
                disabled={isRootBudget}
              />
            </Grid>
            <Grid item>
              <BudgetAllocationInput />
            </Grid>
            <Grid item>
              <BudgetInput
                name="parent"
                label="Parent"
                budgetFilter={(b) => b.isNode}
                disabled={isRootBudget}
              />
            </Grid>
            <Grid item container justifyContent="flex-end" gap={1}>
              <Grid item>
                <Button disabled={loading || isRootBudget} type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default BudgetForm;
