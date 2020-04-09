export interface RouterReducerState {
  location: { pathname: string; search: string; hash: string; query: {} };
  action: 'POP' | 'PUSH' | 'REPLACE';
}

export interface CommonReducerState {
  user: {
    isLoading: boolean;
    info: null | string;
  };
}

// interface SetUserSuccess {
//   type: typeof setUserAction.success;
//   paylaod: string;
// }

// export type CommonActionTypes = SetUserSuccess;
