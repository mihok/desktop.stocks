export interface IAction {
  type: string,
}

export interface KeyAction {
  key: string
}

export function KeyDownAction (payload: KeyAction): KeyAction & IAction {
  return {
    type: 'KEY_DOWN',
    ...payload,
  }
}

export function KeyUpAction (payload: KeyAction): KeyAction & IAction {
  return {
    type: 'KEY_UP',
    ...payload,
  }
}
