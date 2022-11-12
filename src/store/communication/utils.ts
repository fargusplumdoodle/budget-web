import {
  Budget,
  Transaction,
  getTransactionHash,
  getBudgetHash,
  getTagHash,
  Tag,
} from '../data';
import { CommunicationKey } from './types';

export const getId = (key: CommunicationKey, obj: any) => {
  if (obj === null) return;
  if (obj?.id) return obj.id;

  if (typeof obj === 'object') {
    if (key === 'transaction') return getTransactionHash(obj as Transaction);
    if (key === 'budget') return getBudgetHash(obj as Budget);
    if (key === 'tag') return getTagHash(obj as Tag);
  }

  return `${key}_${obj}`;
};
