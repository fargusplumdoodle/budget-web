import React, { FunctionComponent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionSchema } from "../../../util/form";
import { cloneDeep } from "lodash";
import budgets from "../../../__fixtures__/budgets";
import TagInput from "../inputs/TagInput";
import { Button, Grid } from "@mui/material";
import BudgetInput from "../inputs/BudgetInput";
import AmountInput from "../inputs/AmountInput";
import DescriptionInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";
import { Transaction } from "../../../store/data/transactions/types";

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
    defaultValues: transaction
      ? cloneDeep(transaction)
      : {
          id: null,
          amount: 0,
          description: "",
          status: "init",
          budget: budgets.byName["food"],
          date: new Date(),
          income: false,
          transfer: false,
          tags: [],
        },
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
            <BudgetInput />
          </Grid>
          <Grid item>
            <AmountInput />
          </Grid>
          <Grid item>
            <DescriptionInput />
          </Grid>
          <Grid item>
            <DateInput />
          </Grid>
          <Grid item container justifyContent="flex-end" gap={1}>
            {transaction?.id && (
              <Grid item>
                <Button variant="text" color="error" onClick={onDelete}>
                  DELETE
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
