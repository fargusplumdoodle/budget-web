import * as React from "react";
import { FunctionComponent } from "react";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogTitle } from "@mui/material";
import { Tag } from "../../../../store/types/models";
import TagForm from "./TagForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmitCallback?: (tag: Tag) => void;
  tag?: Tag;
}

const TagFormDialog: FunctionComponent<Props> = (props) => {
  const isEdit = Boolean(props["tag"]) && props.tag.id;
  return (
    <Dialog onClose={props.onClose} open={props.open}>
      <DialogTitle>{isEdit ? "Edit" : "Add"} Tag</DialogTitle>
      <DialogContent>
        <TagForm
          tag={props.tag}
          onSubmitCallback={(tag: Tag) => {
            props.onSubmitCallback(tag);
            props.onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TagFormDialog;
