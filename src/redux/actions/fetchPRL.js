import { MANDI_ROUTES_LIST } from "../../utils/consts.js";

export const fetchPRL = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "LOADING_PRL" });
    const firestore = getFirestore();
    firestore.collection(MANDI_ROUTES_LIST).onSnapshot((querySnapshot) => {
      let prl = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== "DummyDoc" && Object.keys(doc.data()).length > 2) {
          let docData = doc.data();
          for (const routes in docData) {
            if (docData[routes].Status === "Live") {
              let liveMandiRoutes = docData[routes];
              liveMandiRoutes["Mandi"] = doc.id;
              prl.push(liveMandiRoutes);
            }
          }
        }
      });
      dispatch({ type: "STORE_PRL", payload: prl });
      dispatch({ type: "LOADED_PRL" });
    });
  };
};
