import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

firebase.initializeApp(config);
const _auth = firebase.auth();
// const _asd = firebase.app();

class Firebase {
  // private _auth: ReturnType<typeof firebase.auth>;
  // constructor() {
  // }

  logIn = (email: string, password: string) => _auth.signInWithEmailAndPassword(email, password);
  signUp = (email: string, password: string) =>
    _auth.createUserWithEmailAndPassword(email, password);
  logOut = () => _auth.signOut();

  // getApplicationVerifier = () => _asd.analytics()
  // logInWithPhone = (number: string) => _auth.signInWithPhoneNumber(number);

  //   doCreateUserWithEmailAndPassword = (email, password) =>
  //     this.auth.createUserWithEmailAndPassword(email, password);
  //   doSignInWithEmailAndPassword = (email, password) =>
  //     this.auth.signInWithEmailAndPassword(email, password);
  //   doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
  //   doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
