import * as React from "react";
import { Autocomplete, styled, TextField } from "@mui/material";
import { store } from "../../../store/configureStore";
import { Tag } from "../../../store/models/types";
import { ExpressionInputProps } from "../types";

interface Props extends ExpressionInputProps<Tag[]> {
  [k: string]: any;
  textFieldProps?: {
    [k: string]: any;
  };
}

const Input = styled(Autocomplete)(() => ({
  width: "100%",
}));

const TagsInput: React.FunctionComponent<Props> = ({
  textFieldProps,
  onChange,
  ...props
}) => {
  const state = store.getState();
  return (
    <Input
      options={state.tags.list}
      disablePortal
      multiple
      limitTags={2}
      disableClearable
      isOptionEqualToValue={(option, value) => {
        return (option as Tag).id === (value as Tag).id;
      }}
      getOptionLabel={(option) => (option as Tag).name}
      renderInput={(params: any) => (
        <TextField {...textFieldProps} {...params} placeholder="Tags" />
      )}
      onChange={(e, tags) => {
        onChange(tags as Tag[]);
      }}
      {...props}
    />
  );
};

export default TagsInput;
