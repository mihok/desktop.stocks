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

      result = {
        keyDown: true,
        keys: [...newKeys],
        ...state,
      };

      break;
    case 'KEY_UP':
      const updatedKeys = new Set([...state.keys]);

      updatedKeys.delete(action.key);

      result = {
        keyDown: state.keys ? true : false,
        keys: [...updatedKeys],
        ...state,
      };

      break;
    default: break;
  }

  console.log('STATE', result.keys);
  return result;
}
