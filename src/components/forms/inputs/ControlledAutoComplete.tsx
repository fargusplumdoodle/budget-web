import { Control, Controller, Path } from "react-hook-form";
import { Autocomplete, AutocompleteProps } from "@mui/material";
import * as React from "react";

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

export default function ControlledAutocomplete<FieldValueT, FormT>(
  props: Props<FieldValueT, FormT>
) {
  const autoCompleteOptions = { ...props };
  delete autoCompleteOptions.control;
  delete autoCompleteOptions.name;
  delete autoCompleteOptions.getValues;

  return (
    <Controller
      name={props.name}
      render={({ field: { onChange } }) => (
        <Autocomplete
          {...autoCompleteOptions}
          options={props.options}
          value={props.getValues(props.name)}
          onChange={(e, data) => onChange(data)}
        />
      )}
      control={props.control}
    />
  );
}
