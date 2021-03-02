import { IAction, KeyAction } from './actions';

export interface UserInterfaceState {
  keyDown: boolean
  keys: Array<string>
}

export const DEFAULT_STATE: UserInterfaceState = {
  keyDown: false,
  keys: [],
};

export function UserInterfaceReducer (
  state: UserInterfaceState = DEFAULT_STATE,
  action: KeyAction & IAction,
): UserInterfaceState {
  let result: UserInterfaceState = state;

  switch(action.type) {
    case 'KEY_DOWN':
      const newKeys = new Set([...state.keys, action.key]);

      console.log('KEY_DOWN', newKeys);

      result = {
        ...state,
        keyDown: true,
        keys: [...newKeys],
      };

      break;
    case 'KEY_UP':
      const updatedKeys = new Set([...state.keys]);

      updatedKeys.delete(action.key);

      result = {
        ...state,
        keyDown: state.keys ? true : false,
        keys: [...updatedKeys],
      };

      break;
    default: break;
  }

  console.log('STATE', result);
  return result;
}
