import React, { FunctionComponent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cloneDeep } from "lodash";
import { Button, Grid } from "@mui/material";
import { transactionSchema } from "../../../util/form";
import budgets from "../../../__fixtures__/budgets";
import TagInput from "../../inputs/TagInput";
import BudgetInput from "../../inputs/BudgetInput";
import AmountInput from "../../inputs/AmountInput";
import TextInput from "../../inputs/TextInput";
import DateInput from "../../inputs/DateInput";
import { Transaction } from "../../../store";
import { getDefaultFormValues } from "./utils";

interface Props {
  transaction: Transaction | null;
  onSubmit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  loading: boolean;
}

const TransactionForm: FunctionComponent<Props> = ({
  transaction,
  onSubmit,
  onDelete,
  loading,
}) => {
  const formMethods = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: getDefaultFormValues(transaction),
    mode: "onSubmit",
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Grid container direction="column" gap={1}>
          <Grid item>
            <TagInput />
          </Grid>
          <Grid item>
            <BudgetInput budgetFilter={(b) => !b.isNode} label="Budget" />
          </Grid>
          <Grid item>
            <AmountInput />
          </Grid>
          <Grid item>
            <TextInput fieldName="description" label="Description" />
          </Grid>
          <Grid item>
            <DateInput />
          </Grid>
          <Grid item container justifyContent="flex-end" gap={1}>
            {transaction?.id && (
              <Grid item>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => onDelete(transaction)}
                >
                  Delete
                </Button>
              </Grid>
            )}
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

export default TransactionForm;
