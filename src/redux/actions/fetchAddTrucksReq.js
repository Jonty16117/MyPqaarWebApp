import { ADD_TRUCKS_REQ } from "../../utils/consts.js";

export const fetchAddTrucksReq = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection(ADD_TRUCKS_REQ).onSnapshot((querySnapshot) => {
      let newData = new Map();
      dispatch({ type: "FETCHING_ADD_TRUCKS_REQ" });

      querySnapshot.forEach((doc) => {
        if (doc.id !== "DummyDoc") {
          newData.set(doc.id, doc.data());
        }
      });

      dispatch({ type: "FETCHED_ADD_TRUCKS_REQ", payload: newData });
    });
  };
};
