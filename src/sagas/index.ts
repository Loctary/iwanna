import { fork } from 'redux-saga/effects';

import common from 'sagas/common';

export default function* rootSaga() {
  yield* [fork(common)];
}
