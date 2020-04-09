import { takeLatest, fork } from 'redux-saga/effects';

import { logIn } from 'store/common/sagas';
import { logInAction } from 'store/common/actions';

function* common() {
  yield takeLatest(logInAction.pending, logIn);
}

export default function*() {
  yield fork(common);
}
