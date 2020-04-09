import { put } from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import { History } from 'history';
import { logInAction } from 'store/common/actions';
import { FirebaseType } from 'components/Firebase/FirebaseHOC';

interface LogIn {
  payload: {
    email: string;
    password: string;
    firebase: FirebaseType;
    history: History;
  };
}

export const logIn: Saga = function*({ payload }: LogIn) {
  try {
    const response = yield payload.firebase.logIn(payload.email, payload.password);
    yield put({ type: logInAction.success, payload: response });
  } catch (errors) {
    payload.history.push('/not-found');
    yield put({ type: logInAction.failure, payload: errors });
  }
};
