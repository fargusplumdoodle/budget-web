import * as React from 'react';
import { Control, Path } from 'react-hook-form';
import { SxProps, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { InputErrorMessage } from '../types';
import ControlledAutocomplete from './ControlledAutoComplete';
import { Budget, selectBudgetByName, selectBudgetList } from '../../../store';

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  errors: InputErrorMessage;
  getValues: (path: string) => Budget;
  defaultValue?: Budget;
  options?: Budget[];
  multiple?: boolean;
  sx?: SxProps;
}
function BudgetsInput<FormT>({
  name,
  control,
  getValues,
  errors,
  ...autoCompleteOptions
}: Props<FormT>) {
  const budgets = useSelector(selectBudgetList);
  const foodBudget = useSelector(selectBudgetByName('food'));
  return (
    <ControlledAutocomplete<Budget, FormT>
      name={name}
      control={control}
      getValues={getValues}
      defaultValue={foodBudget}
      disablePortal
      options={budgets}
      disableClearable
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option: Budget | string) => (option as Budget).name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Budget"
          error={Boolean(errors)}
          helperText={errors ? errors.message : ''}
        />
      )}
      {...autoCompleteOptions}
    />
  );
}

export default BudgetsInput;
