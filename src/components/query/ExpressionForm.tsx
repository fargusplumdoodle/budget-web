import { Delete } from "@mui/icons-material";
import {
  styled,
  Button,
  DialogActions as MuiDialogActions,
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  Autocomplete,
  TextField,
  Grid,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import { fadeInAndUp } from "../../theme/animations";
import { Expression, Operand, Operator } from "./types";
import { OPERANDS } from "./constants/operands";

const Dialog = styled(MuiDialog)(() => ({
  animation: `${fadeInAndUp} 0.2s`,
  '& [class*="MuiPaper-root"]': {
    overflowY: "visible",
  },
}));

const Container = styled(Grid)(({ theme }) => ({
  alignContent: "center",
  flexDirection: "column",
  width: 232,
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    justifyContent: "center",
    width: 288,
  },
}));

const Field = styled(Grid)(() => ({
  minWidth: 132,
  width: "100%",
}));

const DialogActions = styled(MuiDialogActions)(() => ({
  display: "flex",
}));

export const DeleteButton = styled(Button)(() => ({
  marginRight: "auto",
}));

interface ExpressionFormProps {
  open: boolean;
  expression: Expression<any>;
  onUpdate: (expression: Expression<any>) => void;
  onDelete: (expression: Expression<any>) => void;
  cancel: () => void;
}

const ExpressionForm: FunctionComponent<ExpressionFormProps> = ({
  open,
  expression,
  onUpdate,
  onDelete,
  cancel,
}) => {
  const [state, setState] = useState<Expression<any>>({
    ...expression,
  });

  return (
    <Dialog open={open} onClose={cancel}>
      <DialogTitle>Expression</DialogTitle>
      <DialogContent>
        <Container container spacing={1}>
          <Field
            item
            xs
            component={Autocomplete}
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} />
            )}
            disableClearable
            options={Object.values(OPERANDS)}
            getOptionLabel={(option: Operand<any>) => option.label}
            value={state?.operand}
            isOptionEqualToValue={(
              option: Operand<any>,
              value: Operand<any>
            ) => {
              return option.name === value.name;
            }}
            // @ts-ignore
            onChange={(e, operand: Operand<any>) =>
              setState({
                ...state,
                value: operand.getDefaultValue(),
                operator: operand.operators[0],
                operand,
              })
            }
          />
          <Field
            item
            xs
            component={Autocomplete}
            disableClearable
            renderInput={(params: AutocompleteRenderInputParams) => (
              <TextField {...params} />
            )}
            options={state.operand.operators}
            value={state.operator}
            getOptionLabel={(option: Operator<any>) => option.name}
            isOptionEqualToValue={(
              option: Operator<any>,
              value: Operator<any>
            ) => {
              return option.name === value.name;
            }}
            // @ts-ignore
            onChange={(_e, operator: Operator<any>) =>
              setState({ ...state, operator })
            }
          />
          <Field item xs>
            <state.operand.input
              value={state.value}
              onChange={(value) => {
                setState({ ...state, value });
              }}
            />
          </Field>
        </Container>
      </DialogContent>
      <DialogActions>
        <DeleteButton color="error" onClick={() => onDelete(expression)}>
          <Delete />
        </DeleteButton>
        <Button onClick={cancel}>Cancel</Button>
        <Button variant="contained" onClick={() => onUpdate(state)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpressionForm;
