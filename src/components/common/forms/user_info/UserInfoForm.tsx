import * as React from "react";
import { UserInfo } from "../../../../store/types/models";
import { connect } from "react-redux";
import { RootState } from "../../../../store/configureStore";
import { FormItem, userInfoSchema } from "../../../../util/form";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledAmountInput from "../inputs/ControlledAmountInput";

const classes = {
  root: {
    maxWidth: "515px",
  },
};

type UserInfoFormProps = {
  onSubmit: (data: UserInfo) => void;
  loading: boolean;
  userInfo: UserInfo;
};

const UserInfoForm: React.FC<UserInfoFormProps> = function ({
  onSubmit,
  loading,
  userInfo,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userInfoSchema),
    defaultValues: userInfo,
  });

  return (
    <>
      <Stack spacing={2} sx={classes.root}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem>
            <ControlledAmountInput
              label="Expected Monthly Net Income"
              name="expected_monthly_net_income"
              control={control}
              errors={errors.expected_monthly_net_income}
              showError
              sx={{ width: "100%", marginRight: 1 }}
            />
          </FormItem>

          <FormItem>
            <Button type="submit" disabled={loading}>
              {loading ? <CircularProgress /> : "SUBMIT"}
            </Button>
          </FormItem>
        </form>
      </Stack>
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(UserInfoForm);
