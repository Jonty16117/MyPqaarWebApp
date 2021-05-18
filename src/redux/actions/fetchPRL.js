import { MANDI_ROUTES_LIST } from "../../utils/consts.js";

export const fetchPRL = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection(MANDI_ROUTES_LIST).onSnapshot((querySnapshot) => {
      dispatch({ type: "LOADING_PRL" });
      let prl = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== "DummyDoc") {
          let docData = doc.data();
          for (const routes in docData) {
            if (
              docData[routes].Status === "Live" &&
              Object.keys(docData[routes]).length > 2
            ) {
        // console.log("prl: ", Object.keys(doc.data()).length)
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
