import React, { FunctionComponent, ReactElement, useState } from "react";
import { TagDialog } from "../../components/dialogs";
import { useDispatch, useSelector } from "react-redux";
import {
  createTag,
  deleteTag,
  selectEditTag,
  selectEditTagDialogOpen,
  selectRequestByModel,
  Tag,
  updateTag,
} from "../../store";
import { closeTagDialog, editTag } from "../../store/location/ui/slice";

interface Props {
  children: ReactElement[] | ReactElement;
}

const TagDialogProvider: FunctionComponent<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const tag = useSelector(selectEditTag);
  const dialogOpen = useSelector(selectEditTagDialogOpen);

  const [savingTag, setSavingTag] = useState(tag);

  const requestState = useSelector(selectRequestByModel("tag", savingTag));
  const loading = requestState ? requestState.status !== "loaded" : false;

  const onSubmit = (newTag: Tag) => {
    setSavingTag(newTag);
    if (newTag.id) {
      dispatch(updateTag(newTag));
    } else dispatch(createTag(newTag));
    dispatch(editTag(newTag));
    dispatch(closeTagDialog());
  };

  const onDelete = (tag: Tag) => dispatch(deleteTag(tag));

  return (
    <>
      {children}
      <TagDialog
        tag={tag}
        loading={loading}
        open={dialogOpen}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </>
  );
};

export default TagDialogProvider;
