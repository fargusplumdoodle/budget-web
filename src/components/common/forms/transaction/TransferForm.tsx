import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormItem, transferSchema } from "../../../../util/form";
import { Budget, Transaction } from "../../../../store/types/models";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import {
  Button,
  CircularProgress,
  FormHelperText,
  Input,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import ControlledAutocomplete from "../inputs/ControlledAutoComplete";
import ApiErrorDialog, { ApiError } from "../../ApiErrorDialog";
import { createTransaction } from "../../../../api/transaction";
import { createTransferTransactions } from "../../../../util/transfer";
import { ProviderContext, withSnackbar } from "notistack";

interface Props extends ProviderContext {
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
  const [apiError, setApiError] = useState<ApiError>(null);
  const budgets = useSelector((state: RootState) => state.budgets);

  const defaultValues = {
    amount: 0,
    description: "",
    date: new Date(),
    fromBudget: budgets.list[0],
    toBudget: budgets.list[1],
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transferSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: TransferFormData) => {
    setLoading(true);
    const transactions = createTransferTransactions({
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
        props.onCreateCallback(
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
          <FormItem>
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
            <FormHelperText error={Boolean(errors.amount)}>
              {errors.amount ? errors.amount.message : ""}
            </FormHelperText>
          </FormItem>

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
            <ControlledAutocomplete<Budget, TransferFormData>
              name="fromBudget"
              control={control}
              getValues={getValues}
              defaultValue={budgets.byName["food"]}
              disablePortal
              options={budgets.list.filter(
                (b) => b.id !== getValues("toBudget").id
              )}
              disableClearable
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              getOptionLabel={(option: Budget) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Budget"
                  error={Boolean(errors.fromBudget)}
                  helperText={(errors.fromBudget as any)?.message}
                />
              )}
            />
          </FormItem>

          <FormItem>
            <ControlledAutocomplete<Budget, TransferFormData>
              name="toBudget"
              control={control}
              getValues={getValues}
              defaultValue={budgets.byName["food"]}
              disablePortal
              options={budgets.list.filter(
                (b) => b.id !== getValues("fromBudget").id
              )}
              disableClearable
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              getOptionLabel={(option: Budget) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Budget"
                  error={Boolean(errors.toBudget)}
                  helperText={(errors.toBudget as any)?.message}
                />
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

export default withSnackbar(TransferForm);
