import {
  Autocomplete,
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  ToggleButtonGroup,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as React from "react";
import { Transaction, Budget } from "../../../../store/types/models";
import {
  bulkGenerator,
  generateTestBudget,
  generateTransaction,
} from "../../../../util/generators";
import { SyntheticEvent } from "react";
import { DatePicker, LocalizationProvider, ToggleButton } from "@mui/lab";
import { Add, Remove } from "@mui/icons-material";

export interface Props {
  transaction?: Transaction;
}

interface BudgetOption {
  label: String;
  value: Budget;
}

export default function TransactionForm(props: Props) {
  const [transaction, setTransaction] = React.useState(
    props.transaction || generateTransaction({ date: new Date() })
  );
  const budgets = bulkGenerator(generateTestBudget, 12).map((budget) => {
    return { label: budget.name, value: budget };
  });

  const handleChange =
    (prop: keyof Transaction) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTransaction({ ...transaction, [prop]: event.target.value });
    };

  const budgetSelectOnChange = (
    event: SyntheticEvent,
    newValue: BudgetOption
  ) => {
    setTransaction({
      ...transaction,
      budget: newValue.value,
      budget_id: newValue.value.id,
    });
  };

  const handlePositiveNegativeChange = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    console.log(event);
    // if (event.target === "+") {
    //   setTransaction({ ...transaction, amount: Math.abs(transaction.amount) });
    // } else {
    //   setTransaction({
    //     ...transaction,
    //     amount: 0 - Math.abs(transaction.amount),
    //   });
    // }
  };

  return (
    <div>
      <br />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "715px",
        }}
      >
        <FormControl
          sx={{ m: 1, display: "flex", flexDirection: "row", width: "47%" }}
        >
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={transaction.amount}
            onChange={handleChange("amount")}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <ToggleButtonGroup
            exclusive
            onChange={handlePositiveNegativeChange}
            aria-label="text alignment"
            sx={{ paddingLeft: 1 }}
          >
            <ToggleButton value="+" aria-label="left aligned">
              <Add />
            </ToggleButton>
            <ToggleButton value="-" aria-label="left aligned">
              <Remove />
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
        <FormControl sx={{ m: 1, width: "47%" }}>
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
      </Box>
      <FormControl sx={{ m: 1, width: "47%" }}>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input
          id="description"
          value={transaction.description}
          onChange={handleChange("description")}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "47%" }}>
        <FormControl sx={{ m: 1, width: "47%" }}>
          <Autocomplete
            disablePortal
            options={budgets}
            value={{
              label: transaction.budget.name,
              value: transaction.budget,
            }}
            onChange={budgetSelectOnChange}
            renderInput={(params) => <TextField {...params} label="Budget" />}
          />
        </FormControl>
      </FormControl>
    </div>
  );
}
