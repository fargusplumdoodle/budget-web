import { Transaction } from '../../data';

export type Pane = 'theme' | 'transaction';

export interface PanesState {
  current: Pane | null;
  transaction: Transaction | null;
}
