import { AnyAction } from 'redux';
import { CommonReducerState } from 'store/common';
import { logInAction } from 'store/common/actions';

const initialState = {
  user: {
    isLoading: false,
    info: null,
  },
};

export function commonReducer(state = initialState, action: AnyAction): CommonReducerState {
  switch (action.type) {
    case logInAction.pending:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true,
        },
      };
    case logInAction.failure:
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          // errors: action.payload,
        },
      };
    case logInAction.success:
      return {
        ...state,
        user: {
          isLoading: false,
          info: action.payload.user,
        },
      };
    default:
      return state;
  }
}
