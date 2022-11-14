import * as React from "react";
import { useState } from "react";
import { Card } from "@mui/material";
import { useDispatch } from "react-redux";
import UserInfoForm from "../components/forms/UserInfoForm";
import { ApiErrorDialog, ApiError } from "../components";
import { updateUserSettings, UserSettingsState } from "../store";

const classes = {
  root: {
    borderRadius: 4,
    p: 4,
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
