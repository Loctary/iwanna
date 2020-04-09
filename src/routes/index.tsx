import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { createBrowserHistory } from 'history';
import SignUp from 'pages/SignUp';
import LogIn from 'pages/LogIn';
import MainLayout from 'components/Layout/MainLayout';
import NotFound from 'pages/NotFound/NotFound';

export const history = createBrowserHistory();

export const routes = [
  {
    name: 'SingUp',
    Component: SignUp,
    path: '/signUp',
    exact: true,
    backgroundColor: '#DCED31',
  },
  {
    name: 'LogIn',
    Component: LogIn,
    path: '/logIn',
    exact: true,
    backgroundColor: '#0CCE6B',
  },
  {
    name: 'NotFound',
    Component: NotFound,
    path: '/not-found',
    exact: true,
    backgroundColor: '#FFF',
  },
];

export const Router: React.FC = React.memo(() => {
  return (
    <ConnectedRouter history={history}>
      <HashRouter>
        <MainLayout>
          <div className="transition">
            {/* <Header /> */}
            <Route
              render={({ location }) => (
                <TransitionGroup>
                  <CSSTransition key={location.pathname} timeout={150} classNames="forward">
                    <Switch location={location}>
                      {routes.map(({ Component, path, exact, name }) => (
                        <Route path={path} exact={exact} key={name} name={name}>
                          <Component />
                        </Route>
                      ))}
                      <Route path="/" exact>
                        <Redirect to="/logIn" />
                      </Route>
                      <Redirect to="/not-found" />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              )}
            />
          </div>
        </MainLayout>
      </HashRouter>
    </ConnectedRouter>
  );
});
