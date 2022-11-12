import sha1 from 'sha1';
import { Tag } from './types';
import {
  CRUDAction,
  getId,
  makeRequest,
  RequestStatus,
} from '../../communication';

export const getTagHash = (tag: Tag): string => sha1(tag.name);

export const getTagRequest = (
  tag: Tag | null,
  action: CRUDAction,
  status: RequestStatus,
) => makeRequest({
  id: getId('tag', tag || action),
  key: 'tag',
  action,
  status,
});
