import { ActionCreator as AC } from 'redux';

type Payload = string | number | object | boolean;

type Action<T = Payload> = {
  type: string;
  payload?: T;
};

interface SyncActionCreator<T> extends AC<Action<T>> {
  success: string;
}

interface AsyncActionCreator<T> extends AC<Action<T>> {
  pending: string;
  success: string;
  failure: string;
}

export const SUFFIXES = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

const defaultActionMaker = <P>(type: string, payload: P) => ({ type, payload });

type ACConfig<P> = {
  makeAction?: AC<Action<P>>;
};

export function asyncAction<P = Payload>(
  base: string,
  { makeAction = defaultActionMaker }: ACConfig<P> = {},
): AsyncActionCreator<P> {
  const actionCreator = (payload: P) => makeAction(`${base}/${SUFFIXES.PENDING}`, payload);

  actionCreator.pending = `${base}/${SUFFIXES.PENDING}`;
  actionCreator.success = `${base}/${SUFFIXES.SUCCESS}`;
  actionCreator.failure = `${base}/${SUFFIXES.FAILURE}`;
  return actionCreator;
}

export function syncAction<P = Payload>(
  base: string,
  { makeAction = defaultActionMaker }: ACConfig<P> = {},
): SyncActionCreator<P> {
  const actionCreator = (payload: P) => makeAction(base, payload);

  actionCreator.success = base;
  return actionCreator;
}
