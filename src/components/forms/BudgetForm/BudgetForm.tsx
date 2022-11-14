import React, { FunctionComponent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@mui/material";
import { Budget } from "../../../store";
import { budgetFromBudgetForm, getDefaultFormValues } from "./util";
import { budgetFormSchema } from "./schema";
import { BudgetFormType } from "./type";
import { AllocationInput, BudgetInput } from "../../inputs";
import TextInput from "../../inputs/TextInput";

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
    onSubmit(budget);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
        <Grid container direction="column" gap={1}>
          <Grid item>
            <TextInput fieldName="name" label="Name" />
          </Grid>
          <Grid item>
            <AllocationInput />
          </Grid>
          <Grid item>
            <BudgetInput name="parent" />
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
