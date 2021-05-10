import { combineReducers } from "redux";
import authReducer from "./authReducer";
import firestoreReducer from "./firestoreReducer";
import { firebaseReducer } from "react-redux-firebase";
// import localDataReducer from "./localDataReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
