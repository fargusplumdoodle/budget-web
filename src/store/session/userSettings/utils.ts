import { CRUDAction, makeRequest, RequestStatus } from '../../communication';

export const getUserSettingsRequest = (
  action: CRUDAction,
  status: RequestStatus,
) => makeRequest({
  id: `userSettings_${action}`,
  key: 'userSettings',
  action,
  status,
});
