import React, { FunctionComponent, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  FormHelperText,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { getMuiFilledInputStyles } from "@fargusplumdoodle/themes";
import capitalize from "lodash/capitalize";
import { selectTagList, Tag } from "../../store";
import { editTag } from "../../store/location/ui/slice";

interface Props {
  onChangeSideEffect?: (tags: Tag[]) => void;
}

const TagInput: FunctionComponent<Props> = () => {
  const dispatch = useDispatch();
  const tags = useSelector(selectTagList);
  const {
    formState: { errors },
  } = useFormContext();

  const {
    field: { value, onChange },
  } = useController({ name: "tags" });

  return (
    <>
      <Grid container wrap="nowrap" gap={1}>
        <Grid
          item
          xs
          component={Autocomplete}
          disablePortal
          multiple
          limitTags={1}
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              fullWidth
              error={!!errors.tags}
              helperText={errors ? errors.tags?.message : ""}
              placeholder="Tags"
            />
          )}
          value={value}
          options={tags}
          getOptionLabel={(tag: Tag) => capitalize(tag.name)}
          isOptionEqualToValue={(option: Tag, tag: Tag) => option.id === tag.id}
          // @ts-ignore
          onChange={(_, tag: Tag) => onChange(tag)}
        />

        <Grid
          item
          component={Button}
          xs={1}
          onClick={() => dispatch(editTag(null))}
          sx={(theme) => {
            const { backgroundColor, hoverBackground } =
              getMuiFilledInputStyles(theme.palette.mode);
            return {
              backgroundColor,
              color:
                theme.palette.mode === "light"
                  ? "text.disabled"
                  : theme.palette.text.primary,
              "&:hover": {
                backgroundColor: hoverBackground,
              },
            };
          }}
        >
          <Add />
        </Grid>
      </Grid>
      {!!errors.tags && (
        <FormHelperText error>
          {capitalize((errors.tags?.message as string) || "")}
        </FormHelperText>
      )}
    </>
  );
};

export default TagInput;
