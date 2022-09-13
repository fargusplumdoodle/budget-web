import * as React from "react";
import { Control, Path } from "react-hook-form";
import { SxProps, TextField } from "@mui/material";
import { InputErrorMessage } from "../types";
import ControlledAutocomplete from "./ControlledAutoComplete";
import { Tag } from "../../../store/models/types";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  errors: InputErrorMessage;
  options: Tag[];
  getValues: (path: string) => Tag;
  sx?: SxProps;
}

function ControlledTagsInput<FormT>({
  name,
  control,
  getValues,
  options,
  errors,
  ...autoCompleteOptions
}: Props<FormT>) {
  const sx = autoCompleteOptions["sx"]
    ? autoCompleteOptions.sx
    : { width: "100%" };
  return (
    <ControlledAutocomplete<Tag, FormT>
      name={name}
      control={control}
      getValues={getValues}
      disablePortal
      multiple
      limitTags={2}
      options={options}
      disableClearable
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id;
      }}
      sx={sx}
      getOptionLabel={(option: Tag | string) => (option as Tag).name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          error={Boolean(errors)}
          helperText={errors ? errors.message : ""}
          placeholder="Tags"
        />
      )}
      {...autoCompleteOptions}
    />
  );
}

export default ControlledTagsInput;
