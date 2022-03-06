import * as React from "react";
import { useState } from "react";
import ApiErrorDialog, { ApiError } from "../components/ApiErrorDialog";
import { Card } from "@mui/material";
import { UserInfo } from "../store/types/models";
import UserInfoForm from "../components/forms/user_info/UserInfoForm";
import { ProviderContext, withSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { loadUserInfoSuccess } from "../store/actions/userInfoActions";
import api from "../api";

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

  const onSubmit = (userInfo: UserInfo) => {
    api.userInfo
      .updateUserInfo(userInfo)
      .then(() => {
        dispatch(loadUserInfoSuccess(userInfo));
        setLoading(false);
        enqueueSnackbar(`Successfully updated user info`, {
          variant: "success",
        });
      })
      .catch((err) => {
        setLoading(false);
        setApiError(err);
      });
  };

  return (
    <>
      <Card sx={classes.root}>
        <UserInfoForm loading={loading} onSubmit={onSubmit} />
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

export default withSnackbar(UserInfoPage);
