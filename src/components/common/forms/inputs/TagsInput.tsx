import * as React from "react";
import { Control, Path } from "react-hook-form";
import { TextField } from "@mui/material";
import { InputErrorMessage } from "../types";
import ControlledAutocomplete from "./ControlledAutoComplete";
import { Tag } from "../../../../store/types/models";

interface Props<FormT> {
  name: Path<FormT>;
  control: Control<FormT, object>;
  errors: InputErrorMessage;
  options: Tag[];
  getValues: (path: string) => Tag;
}

function TagsInput<FormT>({
  name,
  control,
  getValues,
  options,
  errors,
  ...autoCompleteOptions
}: Props<FormT>) {
  return (
    <>
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
        sx={{ width: "100%" }}
        getOptionLabel={(option: Tag) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Tags"
            error={Boolean(errors)}
            helperText={errors ? errors.message : ""}
            placeholder="Tags"
          />
        )}
        {...autoCompleteOptions}
      />
    </>
  );
}

export default TagsInput;
