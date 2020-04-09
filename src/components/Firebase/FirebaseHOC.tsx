import React from 'react';
import Firebase from './Firebase';

export type FirebaseType = Firebase;

export interface WithFirebase {
  firebase: FirebaseType;
}

const FirebaseContext = React.createContext(new Firebase());

type HOC = <T extends WithFirebase>(
  Component: React.ComponentType<T>,
) => React.ComponentType<Omit<T, keyof WithFirebase>>;

export const withFirebase: HOC = <T extends WithFirebase>(
  Component: React.ComponentType<T>,
): React.ComponentType<Omit<T, keyof WithFirebase>> => (props) => (
  <FirebaseContext.Consumer>
    {(firebase: FirebaseType) => <Component {...(props as T)} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;
