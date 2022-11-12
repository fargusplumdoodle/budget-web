import { store } from './configureStore';

export interface Model {
  id: number | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
