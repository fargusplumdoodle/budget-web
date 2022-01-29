import {
  Input,
  Stack,
  InputAdornment,
  TextField,
  Button,
  ToggleButton,
  FormHelperText,
  CircularProgress,
  ToggleButtonGroup,
} from "@mui/material";
import * as React from "react";
import { Budget, Tag, Transaction } from "../../../../store/types/models";
import { generateTransaction } from "../../../../util/generators";
import { RootState } from "../../../../store/configureStore";
import { useSelector } from "react-redux";
import { FormItem, transactionSchema } from "../../../../util/form";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Remove } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { ProviderContext, withSnackbar } from "notistack";
import { useState } from "react";
import ApiErrorDialog, { ApiError } from "../../ApiErrorDialog";
import TagFormDialog from "../tag/TagFormDialog";
import ControlledAutocomplete from "../inputs/ControlledAutoComplete";
import { createTransaction } from "../../../../api/transaction";

// TODO: UPDATE EXISTING TRANSACTION

interface Props extends ProviderContext {
  transaction?: Transaction;
  onSubmitCallback?: (trans: Transaction) => void;
}

type Sign = "+" | "-";

const TransactionForm = (props: Props) => {
  const isEdit = Boolean(props["transaction"]) && props.transaction.id;
  const budgets = useSelector((state: RootState) => state.budgets);
  const tags = useSelector((state: RootState) => state.tags);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError>(null);
  const [transactionSign, setTransactionSign]: [Sign, any] = useState("-");
  const [newTagDialogOpen, setNewTagDialogOpen] = useState(false);

  const defaultValues = isEdit
    ? props.transaction
    : generateTransaction({
        id: null,
        date: new Date(),
        description: "",
        amount: 0,
        budget: budgets.byName["food"],
        tags: [],
      });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
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

  const onSubmit = (data: Transaction): void => {
    setLoading(true);

    const transaction: Transaction = {
      ...data,
      amount:
        transactionSign === "-"
          ? 0 - Math.abs(data.amount)
          : Math.abs(data.amount),
    };

    createTransaction(transaction)
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
              flexDirection: "row",
            }}
          >
            <ControlledAutocomplete<Tag, Transaction>
              name="tags"
              control={control}
              getValues={getValues}
              disablePortal
              multiple
              limitTags={2}
              options={tags.list}
              disableClearable
              isOptionEqualToValue={(option, value) => {
                return option.id === value.id;
              }}
              sx={{ width: "100%" }}
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
            <Button
              onClick={() => {
                setNewTagDialogOpen(true);
              }}
            >
              <Add />
            </Button>
          </FormItem>

          <FormItem>
            <ControlledAutocomplete<Budget, Transaction>
              name="budget"
              control={control}
              getValues={getValues}
              defaultValue={budgets.byName["food"]}
              disablePortal
              options={budgets.list}
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
                  error={Boolean(errors.budget)}
                  helperText={(errors.budget as any)?.message}
                />
              )}
            />
          </FormItem>

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
            </FormItem>
            <FormItem>
              <FormHelperText error={Boolean(errors.amount)}>
                {errors.amount ? errors.amount.message : ""}
              </FormHelperText>
            </FormItem>
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
          <FormItem>
            <Button sx={{ width: "100%" }} type="submit" disabled={loading}>
              {loading ? <CircularProgress /> : "SUBMIT"}
            </Button>
          </FormItem>
        </Stack>
      </form>

      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
        }}
      />

      <TagFormDialog
        open={newTagDialogOpen}
        onClose={() => {
          setNewTagDialogOpen(false);
        }}
        onSubmitCallback={(tag: Tag) => {
          setValue("tags", [...getValues("tags"), tag]);
        }}
      />
    </>
  );
};

export default withSnackbar(TransactionForm);
