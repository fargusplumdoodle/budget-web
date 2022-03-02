import * as React from "react";
import { FunctionComponent } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle } from "@mui/material";
import TransactionForm from "../../forms/transaction/TransactionForm";
import { Transaction } from "../../../store/types/models";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreateCallback?: (trans: Transaction) => void;
  onUpdateCallback?: (trans: Transaction) => void;
  onDeleteCallback?: (trans: Transaction) => void;
  transaction?: Transaction;
}

const TransactionFormDialog: FunctionComponent<Props> = (props) => {
  const isEdit = Boolean(props["transaction"]) && props.transaction.id;
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>{isEdit ? "Edit" : "Add"} Transaction</DialogTitle>
      <DialogContent>
        <TransactionForm
          transaction={props.transaction}
          onCreateCallback={(trans: Transaction) => {
            props.onCreateCallback(trans);
            props.onClose();
          }}
          onUpdateCallback={(trans: Transaction) => {
            props.onUpdateCallback(trans);
            props.onClose();
          }}
          onDeleteCallback={(trans: Transaction) => {
            props.onDeleteCallback(trans);
            props.onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionFormDialog;
