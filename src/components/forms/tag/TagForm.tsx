import * as React from "react";
import { FunctionComponent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormItem, tagSchema } from "../../../util/form";
import { generateTag } from "../../../util/generators/generators";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { ProviderContext, withSnackbar } from "notistack";
import ApiErrorDialog, { ApiError } from "../../ApiErrorDialog";
import api from "../../../api";
import { Tag } from "../../../store/data/tags";

interface Props extends ProviderContext {
  tag?: Tag;
  onSubmitCallback: (tag: Tag) => void;
}

const TagForm: FunctionComponent<Props> = (props) => {
  const isEdit = Boolean(props["tag"]) && props.tag!.id;
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const defaultValues = isEdit
    ? props.tag
    : generateTag({
        name: "",
      });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tagSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (tag: Tag): void => {
    setLoading(true);
    api.tag
      .createTag(tag)
      .then((tag: Tag) => {
        setLoading(false);
        props.enqueueSnackbar(`Successfully added tag: ${tag.name}`, {
          variant: "success",
        });
        props.onSubmitCallback(tag);
      })
      .catch((err) => {
        setLoading(false);
        setApiError(err);
      });
  };

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          maxWidth: "515px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  helperText={(errors.name as any)?.message}
                  placeholder="Tag Name"
                  error={Boolean(errors.name)}
                  sx={{ width: "100%" }}
                  {...field}
                />
              )}
            />
          </FormItem>

          <FormItem>
            <Button sx={{ width: "100%" }} type="submit" disabled={loading}>
              {loading ? <CircularProgress /> : "SUBMIT"}
            </Button>
          </FormItem>
        </form>
      </Stack>

      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
        }}
      />
    </>
  );
};

export default withSnackbar(TagForm);
