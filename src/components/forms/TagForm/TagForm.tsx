import React, { FunctionComponent } from "react";
import { Tag } from "../../../store";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDefaultFormValues } from "./utils";
import { Button, Grid } from "@mui/material";
import { TextInput } from "../../inputs";
import { tagSchema } from "./schema";

interface Props {
  tag: Tag | null;
  loading: boolean;
  onSubmit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

const TagForm: FunctionComponent<Props> = ({
  tag,
  onSubmit,
  onDelete,
  loading,
}) => {
  const formMethods = useForm({
    resolver: yupResolver(tagSchema),
    defaultValues: getDefaultFormValues(tag),
    mode: "onSubmit",
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <Grid container direction="column" gap={1}>
          <Grid item>
            <TextInput fieldName="name" label="Name" />
          </Grid>
          <Grid item container justifyContent="flex-end" gap={1}>
            {tag?.id && (
              <Grid item>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => onDelete(tag)}
                >
                  Delete
                </Button>
              </Grid>
            )}
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default TagForm;
