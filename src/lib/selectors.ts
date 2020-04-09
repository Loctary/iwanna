import _ from 'lodash';
import { createSelectorCreator, defaultMemoize, Selector } from 'reselect';
import { RootState } from 'store/domain';

export const get = (...path: string[]) => (obj: unknown) => _.get(obj, path);

const createSelector = createSelectorCreator(defaultMemoize, _.isEqual);

export function selector<RV = unknown>(...args: unknown[]): Selector<RootState, RV> {
  // @ts-ignore
  return createSelector(...args);
}
