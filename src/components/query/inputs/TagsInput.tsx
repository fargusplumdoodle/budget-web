import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { store } from "../../../store/configureStore";
import { Tag } from "../../../store/types/models";
import { ExpressionInputProps } from "../types";

interface Props extends ExpressionInputProps<Tag[]> {
  [k: string]: any;
}

const TagsInput: React.FunctionComponent<Props> = (props) => {
  const state = store.getState();
  return (
    <Autocomplete
      options={state.tags.list}
      disablePortal
      multiple
      limitTags={2}
      disableClearable
      isOptionEqualToValue={(option: Tag, value: Tag) => {
        return option.id === value.id;
      }}
      getOptionLabel={(option: Tag) => option.name}
      renderInput={(params: any) => (
        <TextField {...params} variant="standard" placeholder="Tags" />
      )}
      {...props}
      onChange={(e, tags) => {
        props.onChange(tags);
      }}
    />
  );
};

export default TagsInput;
