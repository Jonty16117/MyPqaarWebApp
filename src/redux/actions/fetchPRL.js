import { MANDI_ROUTES_LIST } from "../../utils/consts.js";

export const fetchPRL = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "LOADING_PRL" });
    const firestore = getFirestore();
    firestore.collection(MANDI_ROUTES_LIST).onSnapshot((querySnapshot) => {
      var cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });
      console.log("fetched prl: ", cities);
      dispatch({ type: "LOADED_PRL" });
    });
  };
};

// dispatch({ type: "LOADING_PRL" });
//       console.log("Current data: ", doc.data());
