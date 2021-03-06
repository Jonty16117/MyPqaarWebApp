import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB9FlRAzdyG9CaxekPMHL7uFdp1LloPjqs",
  authDomain: "pqaar-1841d.firebaseapp.com",
  databaseURL: "https://pqaar-1841d-default-rtdb.firebaseio.com",
  projectId: "pqaar-1841d",
  storageBucket: "pqaar-1841d.appspot.com",
  messagingSenderId: "214104549048",
  appId: "1:214104549048:web:9b4dbe89bb7007be69764d",
  measurementId: "G-8D6G8E5HPQ",
};

firebase.initializeApp(config);
firebase.firestore().settings({timestampsInSnapshots: true});

// export const reduxFirebaseConfig = {
//   userProfile: "users",
//   useFirestoreForProfile: true,
//   enableLogging: false,
// };

export default firebase;
