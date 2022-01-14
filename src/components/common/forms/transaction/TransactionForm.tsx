import {
  Autocomplete,
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as React from "react";
import { Transaction, Budget } from "../../../../store/types/models";
import {
  bulkGenerator,
  generateTestBudget,
  generateTransaction,
} from "../../../../util/generators";
import { SyntheticEvent, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { Add, Remove } from "@mui/icons-material";
import { RootState, store } from "../../../../store/configureStore";
import { useSelector } from "react-redux";
import { getOption, Option } from "../../../../util/form";

export interface Props {
  transaction?: Transaction;
}

interface BudgetOption {
  label: String;
  value: number; // budget id
}
type Sign = "+" | "-";

export default function TransactionForm(props: Props) {
  const [transactionSign, setTransactionSign]: [Sign, any] =
    React.useState("-");

  const budgets = useSelector((state: RootState) => state.budgets);
  const tags = useSelector((state: RootState) => state.tags);
  const budgetOptions = budgets.list.map((budget) => getOption(budget));
  const tagOptions = tags.list.map((tag) => getOption(tag));

  const [transaction, setTransaction] = React.useState(
    props.transaction ||
      generateTransaction({
        date: new Date(),
        description: "",
        amount: 0,
        budget: budgets.byName["food"],
        tags: [],
      })
  );

  const handleChange =
    (prop: keyof Transaction) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTransaction({ ...transaction, [prop]: event.target.value });
    };

  const budgetSelectOnChange = (event: SyntheticEvent, newBudget: Option) => {
    const budget = budgets.byId[newBudget.value];
    setTransaction({
      ...transaction,
      budget: budget,
      budget_id: budget.id,
    });
  };

  const handleSignChange = (
    event: React.MouseEvent<HTMLInputElement>,
    sign: Sign | null
  ) => {
    if (!sign) {
      return;
    }
    setTransactionSign(sign);
    // TODO: SET SIGN BEFORE SAVING
  };

  const tagSelectOnChange = (event: SyntheticEvent, newTag: Option[]) => {
    setTransaction({
      ...transaction,
      tags: newTag.map((option: Option) => tags.byId[option.value]),
    });
  };

  return (
    <div>
      <br />
      <Box
        sx={{
          justifyContent: "center",
          maxWidth: "715px",
        }}
      >
        <FormControl sx={{ m: 1, width: "51%" }}>
          <Autocomplete
            disablePortal
            multiple
            limitTags={2}
            options={tagOptions}
            value={transaction.tags.map((tag) => getOption(tag))}
            onChange={tagSelectOnChange}
            disableClearable
            isOptionEqualToValue={(option, value) => {
              return option.value == value.value;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Tags"
                placeholder="Tags"
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{ m: 1, display: "flex", flexDirection: "row", width: "51%" }}
        >
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={transaction.amount !== null ? transaction.amount : ""}
            onChange={handleChange("amount")}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
        </FormControl>
        <FormControl sx={{ m: 1, width: "51%" }}>
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            value={transaction.description}
            onChange={handleChange("description")}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "51%" }}>
          <Autocomplete
            disablePortal
            options={budgetOptions}
            value={getOption(transaction.budget)}
            onChange={budgetSelectOnChange}
            disableClearable
            isOptionEqualToValue={(option, value) =>
              option.value == value.value
            }
            renderInput={(params) => <TextField {...params} label="Budget" />}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "51%" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              disableFuture
              label="Date"
              openTo="year"
              views={["year", "month", "day"]}
              value={transaction.date}
              onChange={handleChange("date")}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl sx={{ m: 1, width: "51%" }}>
          <Button>SUBMIT</Button>
        </FormControl>
      </Box>
    </div>
  );
}
