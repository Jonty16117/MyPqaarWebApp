export const logout = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: "LOGOUT" });
    firebase.auth().signOut();
  };
};
