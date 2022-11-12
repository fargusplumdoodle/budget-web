import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { panesReducer } from './panes';
import { uiReducer } from './ui';

export * from './panes';
export * from './ui';

export const locationReducer = combineReducers({
  panes: panesReducer,
  ui: persistReducer(
    {
      key: 'UI',
      storage,
    },
    uiReducer,
  ),
});