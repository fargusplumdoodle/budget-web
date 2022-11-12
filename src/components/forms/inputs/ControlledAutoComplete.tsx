import { Control, Controller, Path } from 'react-hook-form';
import { Autocomplete, AutocompleteProps } from '@mui/material';
import * as React from 'react';

interface Props<FieldValueT, FormT>
  extends AutocompleteProps<
    FieldValueT,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  > {
  name: Path<FormT>;
  control: Control<FormT, object>;
  getValues: (path: string) => FieldValueT;
}

export default function ControlledAutocomplete<FieldValueT, FormT>({
  control,
  name,
  getValues,
  ...props
}: Props<FieldValueT, FormT>) {
  return (
    <Controller
      name={name}
      render={({ field: { onChange } }) => (
        <Autocomplete
          {...props}
          options={props.options}
          value={getValues(name)}
          onChange={(e, data) => onChange(data)}
        />
      )}
      control={control}
    />
  );
}
