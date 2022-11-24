import { Tag } from "../../data";

export interface TagDialog {
  dialogOpen: boolean;
  tag: Tag | null;
}

export interface UIState {
  mobileDrawerOpen: boolean;
  tagDialog: TagDialog;
}
