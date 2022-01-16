import {
  Autocomplete,
  Input,
  Stack,
  InputAdornment,
  TextField,
  Button,
  ToggleButton,
  FormHelperText,
  CircularProgress,
  ToggleButtonGroup,
  styled,
  Box,
} from "@mui/material";
import * as React from "react";
import { Budget, Tag, Transaction } from "../../../../store/types/models";
import { generateTransaction } from "../../../../util/generators";
import { RootState } from "../../../../store/configureStore";
import { useSelector } from "react-redux";
import { transactionSchema } from "../../../../util/form";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Remove } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as transactionAPI from "../../../../api/transaction";
import { ProviderContext, withSnackbar } from "notistack";
import { useState } from "react";
import ApiErrorDialog, { ApiError } from "../../ApiErrorDialog";

// TODO: UPDATE EXISTING TRANSACTION

interface Props extends ProviderContext {
  transaction?: Transaction;
  onSubmitCallback?: (trans: Transaction) => void;
}

type Sign = "+" | "-";

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));

const TransactionForm = (props: Props) => {
  const isEdit = Boolean(props["transaction"]);
  const budgets = useSelector((state: RootState) => state.budgets);
  const tags = useSelector((state: RootState) => state.tags);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError>(null);
  const [transactionSign, setTransactionSign]: [Sign, any] = useState("-");

  const defaultValues = isEdit
    ? props.transaction
    : generateTransaction({
        date: new Date(),
        description: "",
        amount: 0,
        budget: budgets.byName["food"],
        tags: [],
      });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionSchema),
    defaultValues: defaultValues,
  });

  const handleSignChange = (
    event: React.MouseEvent<HTMLInputElement>,
    sign: Sign | null
  ) => {
    if (!sign) {
      return;
    }
    setTransactionSign(sign);
  };

  const onSubmit = (transaction: Transaction): void => {
    setLoading(true);
    transactionAPI
      .createTransaction({
        ...transaction,
        amount:
          transactionSign === "-"
            ? 0 - Math.abs(transaction.amount)
            : Math.abs(transaction.amount),
      })
      .then((trans: Transaction) => {
        setLoading(false);
        props.enqueueSnackbar("Successfully added transaction", {
          variant: "success",
        });
        props.onSubmitCallback(trans);
      })
      .catch((err) => {
        setLoading(false);
        setApiError(err);
      });
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          maxWidth: "515px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Item>
            <Controller
              name="tags"
              control={control}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  disablePortal
                  multiple
                  limitTags={2}
                  options={tags.list}
                  onChange={(_, data) => onChange(data as Tag[])}
                  disableClearable
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id;
                  }}
                  getOptionLabel={(option: Tag) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Tags"
                      error={Boolean(errors.tags)}
                      helperText={(errors.tags as any)?.message}
                      placeholder="Tags"
                    />
                  )}
                />
              )}
            />
          </Item>

          <Item>
            <Controller
              name="budget"
              control={control}
              defaultValue={budgets.byName["food"]}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  disablePortal
                  options={budgets.list}
                  onChange={(_, data) => onChange(data as Budget)}
                  disableClearable
                  isOptionEqualToValue={(option, value) => {
                    return option.id === value.id;
                  }}
                  getOptionLabel={(option: Budget) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Budgets"
                      error={Boolean(errors.budget)}
                      helperText={(errors.budget as any)?.message}
                    />
                  )}
                />
              )}
            />
          </Item>

          <Item
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
            <ToggleButtonGroup
              exclusive
              onChange={handleSignChange}
              aria-label="text alignment"
              value={transactionSign}
              sx={{ marginLeft: "auto" }}
            >
              <ToggleButton value="+" aria-label="left aligned">
                <Add />
              </ToggleButton>
              <ToggleButton value="-" aria-label="left aligned">
                <Remove />
              </ToggleButton>
            </ToggleButtonGroup>
          </Item>
          <Item>
            <FormHelperText error={Boolean(errors.amount)}>
              {errors.amount ? errors.amount.message : ""}
            </FormHelperText>
          </Item>

          <Item>
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
          </Item>

          <Item>
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
          </Item>
          <Item>
            <Button sx={{ width: "100%" }} type="submit" disabled={loading}>
              {loading ? <CircularProgress /> : "SUBMIT"}
            </Button>
          </Item>
        </form>
      </Stack>

      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
        }}
      />
    </>
  );
};

export default withSnackbar(TransactionForm);
