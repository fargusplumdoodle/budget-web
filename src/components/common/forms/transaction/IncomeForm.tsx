import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Transaction } from "../../../../store/types/models";
import { FormItem, incomeSchema } from "../../../../util/form";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ProviderContext, withSnackbar } from "notistack";
import ApiErrorDialog, { ApiError } from "../../ApiErrorDialog";
import { createIncomeTransactions } from "../../../../util/income";
import { createTransaction } from "../../../../api/transaction";
import AmountInput from "../inputs/AmountInput";
import DescriptionInput from "../inputs/DescriptionInput";

interface Props extends ProviderContext {
  onCreateTransactions: (transactions: Transaction[]) => void;
}

export interface IncomeFormData {
  amount: number;
  description: string;
  date: Date;
}

const IncomeForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError>(null);

  const defaultValues = {
    amount: 0,
    description: "",
    date: new Date(),
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(incomeSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: IncomeFormData): void => {
    setLoading(true);
    const transactions = createIncomeTransactions({
      ...data,
      amount: 0 - Math.abs(data.amount),
    });
    const createTransactionPromises: Promise<Transaction>[] = transactions.map(
      (transaction: Transaction) => {
        return createTransaction(transaction);
      }
    );

    Promise.allSettled(createTransactionPromises)
      .then((promiseStates: PromiseFulfilledResult<Transaction>[]) => {
        setLoading(false);
        props.enqueueSnackbar(`Successfully created income transactions`, {
          variant: "success",
        });
        props.onCreateTransactions(
          promiseStates
            .filter((p) => p.status === "fulfilled")
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{
            maxWidth: "615px",
          }}
        >
          <FormItem
            sx={{
              display: "flex",
            }}
          >
            <AmountInput
              name="amount"
              control={control}
              errors={errors.amount}
              showError={true}
              sx={{ width: "100%", marginRight: 1 }}
            />
          </FormItem>

          <FormItem>
            <DescriptionInput
              name="description"
              control={control}
              errors={errors.description}
            />
          </FormItem>

          <FormItem>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    openTo="day"
                    views={["year", "month", "day"]}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        sx={{ width: "100%" }}
                        {...params}
                      />
                    )}
                    {...field}
                  />
                </LocalizationProvider>
              )}
            />
          </FormItem>
          <Button sx={{ width: "100%" }} type="submit" disabled={loading}>
            {loading ? <CircularProgress /> : "SUBMIT"}
          </Button>
        </Stack>
      </form>

      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
        }}
      />
    </>
  );
};

export default withSnackbar(IncomeForm);
