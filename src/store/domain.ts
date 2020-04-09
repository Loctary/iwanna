import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { commonReducer } from 'store/common/reducer';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from 'routes';
import rootSaga from 'sagas';

const rootReducer = combineReducers({
  common: commonReducer,
  router: connectRouter(history),
  form: formReducer,
});

export default function configureStore(initialState?: RootState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

export const store = configureStore();

export type RootState = ReturnType<typeof rootReducer>;
