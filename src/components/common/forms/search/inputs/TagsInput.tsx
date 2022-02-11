import * as React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Tag } from "../../../../../store/types/models";
import { store } from "../../../../../store/configureStore";
import { Expression } from "../types";

interface Props {
  expression: Expression;
  setValue: (id: string, value: any) => void;
  [k: string]: any;
}

class TagsInput extends React.Component<Props, {}> {
  render() {
    const state = store.getState();
    const props = { ...this.props };
    delete props["expression"];
    delete props["setValue"];
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
          <TextField
            {...params}
            variant="standard"
            label="Tags"
            placeholder="Tags"
          />
        )}
        {...props}
        onChange={(e, tags) => {
          this.props.setValue(this.props.expression.id.toString(), tags);
        }}
      />
    );
  }
}

export default TagsInput;
