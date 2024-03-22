import firebase from "firebase/compat";
import FieldValue = firebase.firestore.FieldValue;

export interface IState {
  showPassword: boolean;
}

export interface ISignInInputs {
  email: string;
  password?: string;
  name?: string
  timestamp: FieldValue
}
