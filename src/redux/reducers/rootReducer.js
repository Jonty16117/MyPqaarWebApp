import { combineReducers } from "redux";
import authReducer from "./authReducer";
import firestoreReducer from "./firestoreReducer";
import localDataReducer from "./localDataReducer";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  localData: localDataReducer,
});

export default rootReducer;
