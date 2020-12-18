import { createStore, combineReducers } from 'redux';

import { UserInterfaceReducer } from './UserInterface';

export const rootReducer = combineReducers({
  ui: UserInterfaceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
);
