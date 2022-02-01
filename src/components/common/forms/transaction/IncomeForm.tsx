import {
  Button,
  CircularProgress,
  FormHelperText,
  Input,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
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
          <div>
            <FormItem
              sx={{
                display: "flex",
              }}
            >
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    error={Boolean(errors.amount)}
                    aria-describedby="amount-helper-text"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    sx={{ width: "100%", marginRight: 1 }}
                    {...field}
                  />
                )}
              />
            </FormItem>
            <FormHelperText error={Boolean(errors.amount)}>
              {errors.amount ? errors.amount.message : ""}
            </FormHelperText>
          </div>

          <FormItem>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  label="Description"
                  helperText={(errors.description as any)?.message}
                  placeholder="Description"
                  error={Boolean(errors.description)}
                  sx={{ width: "100%" }}
                  {...field}
                />
              )}
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
