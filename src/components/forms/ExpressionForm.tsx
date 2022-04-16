import { Delete } from "@mui/icons-material";
import {
  Input,
  styled,
  Button,
  DialogActions as MuiDialogActions,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FunctionComponent } from "react";
import { fadeInAndUp } from "../../theme/animations";
import { Expression } from "../query/types";

const Dialog = styled(MuiDialog)(() => ({
  animation: `${fadeInAndUp} 0.2s`,
}));

const Container = styled(DialogContent)(() => ({
  display: "flex",
  gap: 10,
}));

const DialogActions = styled(MuiDialogActions)(() => ({
  display: "flex",
}));

export const DeleteButton = styled(Button)(() => ({
  marginRight: "auto",
}));

interface ExpressionFormProps {
  expression: Expression<any> | null;
  onUpdate: (expression: Expression<any>) => void;
  onDelete: (expression: Expression<any>) => void;
  cancel: () => void;
}

const ExpressionForm: FunctionComponent<ExpressionFormProps> = ({
  expression,
  onUpdate,
  onDelete,
  cancel,
}) => {
  return (
    <>
      {Boolean(expression) && (
        <Dialog open={Boolean(expression)} onClose={cancel}>
          <DialogTitle>Expression</DialogTitle>
          <Container>
            <Input />
            <Input />
            <Input />
          </Container>
          <DialogActions>
            <DeleteButton
              color="error"
              onClick={() => onDelete(expression as Expression<any>)}
            >
              <Delete />
            </DeleteButton>
            <Button onClick={cancel}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => onUpdate(expression as Expression<any>)}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ExpressionForm;
