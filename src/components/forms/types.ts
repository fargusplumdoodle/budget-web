import { AutocompleteProps } from '@mui/material';

interface HasMessage {
  message?: string;
}
export type InputErrorMessage = HasMessage | undefined;

export type AutoCompleteProps<T> = AutocompleteProps<
  T,
  boolean | undefined,
  boolean | undefined,
  boolean | undefined
>;
