import React, { FunctionComponent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cloneDeep } from "lodash";
import { Button, Grid } from "@mui/material";
import { Budget } from "../../../store";
import { budgetFromBudgetForm, getDefaultFormValues } from "./util";
import { budgetFormSchema } from "./schema";
import { BudgetFormType } from "./type";
import { AllocationInput } from "../../inputs";

interface Props {
  budget: Budget | null;
  onSubmit: (budget: Budget) => void;
  loading: boolean;
}

const BudgetForm: FunctionComponent<Props> = ({
  budget,
  onSubmit,
  loading,
}) => {
  const formMethods = useForm({
    resolver: yupResolver(budgetFormSchema),
    defaultValues: getDefaultFormValues(budget),
    mode: "onSubmit",
  });

  const handleSubmit = (budgetForm: BudgetFormType) => {
    const budget = budgetFromBudgetForm(budgetForm);
    console.log({ budget });
    onSubmit(budget);
  };

  console.log(formMethods.formState.errors);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <Grid container direction="column" gap={1}>
          <Grid item>
            <AllocationInput />
          </Grid>
          <Grid item container justifyContent="flex-end" gap={1}>
            <Grid item>
              <Button disabled={loading} type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default BudgetForm;
