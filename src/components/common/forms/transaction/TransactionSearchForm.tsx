import { Button } from "@mui/material";
import * as React from "react";
import { Budget, Tag } from "../../../../store/types/models";
import { RootState } from "../../../../store/configureStore";
import { useSelector } from "react-redux";
import { FormItem, transactionSearchSchema } from "../../../../util/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProviderContext, withSnackbar } from "notistack";
import TagsInput from "../inputs/TagsInput";
import { InputErrorMessage } from "../types";
import BudgetsInput from "../inputs/BudgetInput";
import AmountInput from "../inputs/AmountInput";
import DescriptionInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";

interface Props extends ProviderContext {
  onSubmit: (formData: TransactionSearchData) => void;
}

interface TransactionSearchData {
  tags: Tag[];
  amountMin: number | null;
  amountMax: number | null;
  description: string | null;
  dateMin: Date | null;
  dateMax: Date | null;
  budgets: Budget[];
}

const TransactionSearchForm = ({ onSubmit }: Props) => {
  // const budgets = useSelector((state: RootState) => state.budgets);
  const tags = useSelector((state: RootState) => state.tags);

  const classes = {
    multiColumnFormItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    halfRow: {
      width: "49%",
    },
    fullRow: {
      width: "98%",
      marginRight: 1,
      marginLeft: 1,
    },
  };
  const defaultValues: TransactionSearchData = {
    tags: [],
    amountMin: null,
    amountMax: null,
    description: null,
    dateMin: null,
    dateMax: null,
    budgets: [],
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionSearchSchema),
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormItem sx={classes.multiColumnFormItem}>
        <DateInput
          sx={classes.halfRow}
          name="dateMin"
          control={control}
          label="Start Date"
        />
        <DateInput
          sx={classes.halfRow}
          name="dateMax"
          control={control}
          label="End Date"
        />
      </FormItem>
      <FormItem sx={classes.multiColumnFormItem}>
        <TagsInput<TransactionSearchData>
          name="tags"
          control={control}
          getValues={getValues}
          options={tags.list}
          errors={errors["tags"] as InputErrorMessage}
          sx={classes.halfRow}
        />
        <BudgetsInput<TransactionSearchData>
          name="budgets"
          control={control}
          getValues={getValues}
          multiple
          errors={errors["budgets"] as InputErrorMessage}
          sx={classes.halfRow}
        />
      </FormItem>

      <FormItem sx={classes.multiColumnFormItem}>
        <FormItem sx={classes.halfRow}>
          <AmountInput
            name="amountMin"
            label="Minimum Amount"
            control={control}
            errors={errors.amountMin}
            showError
            sx={{ width: "100%", marginRight: 1 }}
          />
        </FormItem>

        <FormItem sx={classes.halfRow}>
          <AmountInput
            name="amountMax"
            label="Maximum Amount"
            control={control}
            errors={errors.amountMax}
            showError
            sx={{ width: "100%", marginRight: 1 }}
          />
        </FormItem>
      </FormItem>

      <FormItem>
        <DescriptionInput
          name="description"
          control={control}
          errors={errors.description}
        />
      </FormItem>

      <Button sx={{ width: "100%" }} type="submit">
        SUBMIT
      </Button>
    </form>
  );
};

export default withSnackbar(TransactionSearchForm);
