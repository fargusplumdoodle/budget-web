import * as React from "react";
import { useState } from "react";
import { Button, Card } from "@mui/material";
import { ProviderContext, withSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import UserInfoForm from "../components/forms/user_info/UserInfoForm";
import ApiErrorDialog, { ApiError } from "../components/ApiErrorDialog";
import AuthButton from "../components/auth/AuthButton";
import { UserSettingsState, openThemePane, updateUserSettings } from "../store";

const classes = {
  root: {
    maxWidth: "500px",
  },
};

const UserInfoPage: React.FC = function () {
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const dispatch = useDispatch();

  const onSubmit = (userInfo: UserSettingsState) => {
    dispatch(updateUserSettings(userInfo));
  };

  return (
    <>
      <Card sx={classes.root}>
        <UserInfoForm onSubmit={onSubmit} />
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

export default UserInfoPage;
