import {
  Stack,
  Button,
  ToggleButton,
  Checkbox,
  FormHelperText,
  CircularProgress,
  ToggleButtonGroup,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from "react";
import { Tag, Transaction } from "../../../store/types/models";
import { generateTransaction } from "../../../util/generators";
import { RootState } from "../../../store/configureStore";
import { useSelector } from "react-redux";
import { FormItem, transactionSchema } from "../../../util/form";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Remove } from "@mui/icons-material";
import { ProviderContext, withSnackbar } from "notistack";
import { useState } from "react";
import ApiErrorDialog, { ApiError } from "../../ApiErrorDialog";
import TagFormDialog from "../tag/TagFormDialog";
import api from "../../../api";
import ControlledAmountInput from "../inputs/ControlledAmountInput";
import ControlledTagsInput from "../inputs/ControlledTagsInput";
import { InputErrorMessage } from "../types";
import BudgetsInput from "../inputs/ControlledBudgetInput";
import ControlledDescriptionInput from "../inputs/ControlledDescriptionInput";
import ControlledDateInput from "../inputs/ControlledDateInput";

interface Props extends ProviderContext {
  transaction?: Transaction;
  onCreateCallback?: (trans: Transaction) => void;
  onUpdateCallback?: (trans: Transaction) => void;
  onDeleteCallback?: (trans: Transaction) => void;
}

type Sign = "+" | "-";

const TransactionForm = (props: Props) => {
  const isEdit = Boolean(
    Boolean(props["transaction"]) && props.transaction!.id
  );
  const budgets = useSelector((state: RootState) => state.budgets);
  const tags = useSelector((state: RootState) => state.tags);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [transactionSign, setTransactionSign]: [Sign, any] = useState(
    isEdit ? (props.transaction!.amount > 0 ? "+" : "-") : "-"
  );
  const [newTagDialogOpen, setNewTagDialogOpen] = useState(false);

  const defaultValues = isEdit
    ? { ...props.transaction, amount: Math.abs(props.transaction!.amount) }
    : generateTransaction({
        id: null,
        date: new Date(),
        description: "",
        amount: 0,
        budget: budgets.byName["food"],
        tags: [],
        income: false,
        transfer: false,
      });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Transaction>({
    resolver: yupResolver(transactionSchema),
    defaultValues: defaultValues,
  });

  const handleSignChange = (
    // @ts-ignore
    event: MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => {
    if (!value) {
      return;
    }
    setTransactionSign(value as Sign);
  };

  const onClickDelete = () => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }
    setLoading(true);
    api.transaction.deleteTransaction(props.transaction!).then(() => {
      setLoading(false);
      props.enqueueSnackbar(`Successfully deleted transaction`, {
        variant: "success",
      });
    });
    props.onDeleteCallback!(props.transaction!);
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
    const submitFn = isEdit
      ? (t: Transaction) =>
          api.transaction.updateTransaction(props.transaction!, t)
      : (t: Transaction) => api.transaction.createTransaction(t);

    const callback = isEdit ? props.onUpdateCallback : props.onCreateCallback;

    submitFn(transaction)
      .then((trans: Transaction) => {
        setLoading(false);
        props.enqueueSnackbar(
          `Successfully ${isEdit ? "updated" : "added"} transaction`,
          {
            variant: "success",
          }
        );
        callback!(trans);
      })
      .catch((err) => {
        setLoading(false);
        setApiError(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit((data) => onSubmit(data as Transaction))}>
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
            <ControlledTagsInput<Transaction>
              name="tags"
              control={control}
              getValues={getValues}
              options={tags.list}
              errors={errors["tags"] as InputErrorMessage}
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
            <BudgetsInput<Transaction>
              name="budget"
              control={control}
              getValues={getValues}
              errors={errors["budget"] as InputErrorMessage}
            />
          </FormItem>

          <div>
            <FormItem
              sx={{
                display: "flex",
              }}
            >
              <ControlledAmountInput
                name="amount"
                control={control}
                errors={errors.amount}
                showError={false}
                sx={{ width: "100%", marginRight: 1 }}
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
            <FormHelperText
              sx={{ marginLeft: 1 }}
              error={Boolean(errors.amount)}
            >
              {errors.amount ? errors.amount.message : ""}
            </FormHelperText>
          </div>

          <FormItem>
            <ControlledDescriptionInput
              name="description"
              control={control}
              errors={errors.description}
            />
          </FormItem>

          <FormItem>
            <ControlledDateInput
              name="date"
              control={control}
              sx={{ width: "100%" }}
            />
          </FormItem>

          {isEdit && (
            <FormItem>
              <Controller
                name="income"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Income"
                  />
                )}
              />
              <Controller
                name="transfer"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} checked={field.value} />}
                    label="Transfer"
                  />
                )}
              />
            </FormItem>
          )}

          <FormItem sx={{ display: "flex", flexDirection: "row" }}>
            <Button sx={{ width: "100%" }} type="submit" disabled={loading}>
              {loading ? <CircularProgress /> : "SUBMIT"}
            </Button>
            {isEdit ? (
              <Button
                sx={{ width: "100%" }}
                color="error"
                onClick={onClickDelete}
                type="submit"
                disabled={loading}
              >
                DELETE
              </Button>
            ) : null}
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
          setValue("tags", [...(getValues("tags") as Tag[]), tag]);
        }}
      />
    </>
  );
};

export default withSnackbar(TransactionForm);
