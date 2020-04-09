import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'routes';

import { store } from 'store/domain';
import 'styles/global.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default React.memo(App);
