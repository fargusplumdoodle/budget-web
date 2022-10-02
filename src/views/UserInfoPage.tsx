import * as React from "react";
import { useState } from "react";
import ApiErrorDialog, { ApiError } from "../components/ApiErrorDialog";
import { Button, Card } from "@mui/material";
import UserInfoForm from "../components/forms/user_info/UserInfoForm";
import { ProviderContext, withSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import api from "../api";
import AuthButton from "../components/auth/AuthButton";
import { UserSettingsState, openThemePane, updateUserSettings } from "../store";

const classes = {
  root: {
    maxWidth: "500px",
  },
};

interface UserInfoPageProps extends ProviderContext {}

const UserInfoPage: React.FC<UserInfoPageProps> = function ({
  enqueueSnackbar,
}) {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const dispatch = useDispatch();

  const onSubmit = (userInfo: UserSettingsState) => {
    dispatch(updateUserSettings(userInfo));
  };

  return (
    <>
      <Card sx={classes.root}>
        <UserInfoForm loading={loading} onSubmit={onSubmit} />
      </Card>
      <Button onClick={() => dispatch(openThemePane())}>SET THEMES</Button>
      <AuthButton sx={{ m: 4 }} />
      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
        }}
      />
    </>
  );
};

export default withSnackbar(UserInfoPage);
