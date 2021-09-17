export const resetPassword = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    console.log("credentials: " + credentials.email);
    firebase
      .auth()
      .sendPasswordResetEmail(credentials.email)
      .then(() => {
        dispatch({ type: "SENT_RESET_MAIL" });
      })
      .catch((err) => {
        dispatch({ type: "FAILED_TO_SENT_RESET_MAIL", err });
      });
  };
};
