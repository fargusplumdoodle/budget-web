import React, { FunctionComponent, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import {
  Autocomplete,
  FormHelperText,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import TagFormDialog from "../tag/TagFormDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/configureStore";
import { getMuiFilledInputStyles } from "@fargusplumdoodle/themes";
import capitalize from "lodash/capitalize";
import {Tag} from "../../../store/data/tags";

interface Props {}

const TagInput: FunctionComponent<Props> = () => {
  const tags = useSelector((state: RootState) => state.tags.list);
  const [newTagDialogOpen, setNewTagDialogOpen] = useState(false);
  const {
    getValues,
    setValue,
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
              // helperText={errors ? errors.tags?.message : ""}
              placeholder="Tags"
            />
          )}
          value={value}
          options={tags}
          getOptionLabel={(tag: Tag) => capitalize(tag.name)}
          isOptionEqualToValue={(option: Tag, tag: Tag) => option.id === tag.id}
          onChange={(_, tag) => onChange(tag)}
        />

        <Grid
          item
          component={Button}
          xs={1}
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
          {capitalize(errors.tags?.message)}
        </FormHelperText>
      )}

      <TagFormDialog
        open={newTagDialogOpen}
        onClose={() => {
          setNewTagDialogOpen(false);
        }}
        onSubmitCallback={(tag: Tag) => {
          setValue("tags", [...(getValues("tags") as Tag[]), tag]);
        }}
      />
    </>
  );
};

export default TagInput;
