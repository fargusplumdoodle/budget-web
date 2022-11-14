import React, { FunctionComponent } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle } from "@mui/material";
import { Tag } from "../../store";
import TagForm from "../forms/TagForm";

interface Props {
  tag: Tag | null;
  loading: boolean;
  open: boolean;
  onSubmit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
}

const TagDialog: FunctionComponent<Props> = ({
  tag,
  loading,
  open,
  onSubmit,
  onDelete,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>{tag ? "Edit" : "Add"} Transaction</DialogTitle>
      <DialogContent>
        <TagForm
          tag={tag}
          loading={loading}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TagDialog;
