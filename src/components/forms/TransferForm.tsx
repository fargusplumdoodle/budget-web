import * as React from "react";
import { FunctionComponent, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { Button, CircularProgress, Stack } from "@mui/material";
import { FormItem, transferSchema } from "../../util/form";
import { ApiError, ApiErrorDialog } from "../";
import { createTransaction } from "../../api/endpoints/transaction";
import { createTransferTransactions } from "../../util/transfer";
import { Transaction, Budget, selectBudgetList } from "../../store";
import BudgetInput from "../inputs/BudgetInput";
import TextInput from "../inputs/TextInput";
import { AmountInput } from "../inputs";

interface Props {
  onCreateCallback: (transactions: Transaction[]) => void;
}

export interface TransferFormData {
  amount: number;
  description: string;
  date: Date;
  fromBudget: Budget;
  toBudget: Budget;
}

const TransferForm: FunctionComponent<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const budgets = useSelector(selectBudgetList);

  const defaultValues = {
    amount: 0,
    description: "",
    date: new Date(),
    fromBudget: budgets[0],
    toBudget: budgets[1],
  };

  const formMethods = useForm({
    resolver: yupResolver(transferSchema),
    defaultValues,
  });

  const onSubmit = (data: TransferFormData) => {
    setLoading(true);
    const transactions = createTransferTransactions({
      ...data,
      amount: 0 - Math.abs(data.amount),
    });
    const createTransactionPromises: Promise<Transaction>[] = transactions.map(
      (transaction: Transaction) => createTransaction(transaction)
    );

    Promise.allSettled(createTransactionPromises)
      .then((promiseStates: PromiseSettledResult<Transaction>[]): void => {
        setLoading(false);
        props.onCreateCallback(
          promiseStates
            .filter((p) => p.status === "fulfilled")
            // @ts-ignore
            .map((promise) => promise.value)
        );
      })
      .catch((err) => {
        setLoading(false);
        setApiError(err);
      });
  };
  return (
    <>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            justifyContent="flex-start"
            alignItems="stretch"
            sx={{
              maxWidth: "615px",
            }}
          >
            <AmountInput />
            <TextInput fieldName="description" label="Description" />
            <BudgetInput name="fromBudget" />
            <BudgetInput name="toBudget" />
            <Button sx={{ width: "100%" }} type="submit" disabled={loading}>
              {loading ? <CircularProgress /> : "SUBMIT"}
            </Button>
          </Stack>
        </form>
      </FormProvider>

      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
        }}
      />
    </>
  );
};

export default TransferForm;
