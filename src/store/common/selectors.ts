import { RootState } from 'store/domain';
import { selector, get } from 'lib/selectors';
export const SET_USER = 'COMMON/SET_USER';

const common = (state: RootState) => state.common;
const router = (state: RootState) => state.router;

// COMMON REDUCER
export const getUser = selector(common, get('user'));
export const getUserIsLoading = selector<boolean>(getUser, get('isLoading'));

// ROUTER REDUCER
export const getLocation = selector(router, get('location'));
export const getRouterHashAndQuery = selector<string>(getLocation, get('hash'));
export const getRouterHash = selector<string>(getRouterHashAndQuery, (routerHash: string) => {
  const [hash, queryString] = routerHash.split('?');
  return hash;
});
export const getRouterQuery = selector<string>(getRouterHashAndQuery, (routerHash: string) => {
  const [hash, queryString] = routerHash.split('?');
  return queryString;
});
