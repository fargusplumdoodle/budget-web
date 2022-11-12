import * as React from "react";
import { connect } from "react-redux";
import { Button, Stack } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormItem, userInfoSchema } from "../../util/form";
import { RootState, selectUserSettings, UserSettingsState } from "../../store";
import AmountInput from "../inputs/AmountInput";

const classes = {
  root: {
    maxWidth: "515px",
  },
};

type UserInfoFormProps = {
  onSubmit: (data: UserSettingsState) => void;
  userInfo: UserSettingsState;
};

const UserInfoForm: React.FC<UserInfoFormProps> = function ({
  onSubmit,
  userInfo,
}) {
  const formMethods = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues: userInfo,
  });

  return (
    <Stack spacing={2} sx={classes.root}>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <FormItem>
            <AmountInput />
          </FormItem>

          <FormItem>
            <Button type="submit">'SUBMIT'</Button>
          </FormItem>
        </form>
      </FormProvider>
    </Stack>
  );
};
const mapStateToProps = (state: RootState) => ({
  userInfo: selectUserSettings(state),
});

export default connect(mapStateToProps)(UserInfoForm);
