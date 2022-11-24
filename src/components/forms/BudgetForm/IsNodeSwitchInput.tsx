import React, { FunctionComponent } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";

interface Props {
  disabled?: boolean;
  fieldName?: string;
}

const IsNodeSwitchInput: FunctionComponent<Props> = ({
  fieldName = "isNode",
  disabled = false,
}) => {
  const {
    field: { value, onChange },
  } = useController({ name: fieldName });
  return (
    <FormControlLabel
      control={
        <Switch
          disabled={disabled}
          checked={value}
          onChange={(_) => onChange(!value)}
        />
      }
      label="Node"
      disabled={disabled}
    />
  );
};

export default IsNodeSwitchInput;
