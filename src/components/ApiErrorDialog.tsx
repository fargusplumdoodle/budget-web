import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { FunctionComponent } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface ApiError {
  response: { data: string };
}

interface Props {
  error: ApiError | null;
  onClose: () => void;
}

const ApiErrorDialog: FunctionComponent<Props> = ({ error, onClose }) => {
  if (!error || !error.response || !error.response.data) {
    return <></>;
  }

  return (
    <Dialog open={Boolean(error)}>
      <DialogTitle>{error?.toString()}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <pre>
            <code>{JSON.stringify(error?.response.data, null, 3)}</code>
          </pre>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Sadly Accept</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiErrorDialog;
