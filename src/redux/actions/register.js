export const register = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    console.log("credentials: "+ credentials.email + " " +  credentials.password)
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "REGISTER_SUCCESSFUL" });
      })
      .catch((err) => {
        dispatch({ type: "REGISTER_FAILED", err });
      });
  };
};
