import * as React from 'react';
import { Autocomplete, styled, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExpressionInputProps } from '../types';
import { selectTagList, Tag } from '../../../store';

interface Props extends ExpressionInputProps<Tag[]> {
  [k: string]: any;
  textFieldProps?: {
    [k: string]: any;
  };
}

const Input = styled(Autocomplete)(() => ({
  width: '100%',
}));

const TagsInput: React.FunctionComponent<Props> = ({
  textFieldProps,
  onChange,
  ...props
}) => {
  const tags = useSelector(selectTagList);
  return (
    <Input
      options={tags}
      disablePortal
      multiple
      limitTags={2}
      disableClearable
      isOptionEqualToValue={(option, value) => (option as Tag).id === (value as Tag).id}
      getOptionLabel={(option) => (option as Tag).name}
      renderInput={(params: any) => (
        <TextField {...textFieldProps} {...params} placeholder="Tags" />
      )}
      onChange={(e, tags) => {
        onChange(tags as Tag[]);
      }}
      {...props}
    />
  );
};

export default TagsInput;
