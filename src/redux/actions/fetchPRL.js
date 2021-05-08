import { MANDI_ROUTES_LIST } from "../../utils/consts.js";

export const fetchPRL = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "LOADING_PRL" });
    const firestore = getFirestore();
    firestore.collection(MANDI_ROUTES_LIST).onSnapshot((querySnapshot) => {
      let prl = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== "DummyDoc") {
          // console.log(docName)
          let docData = doc.data();
          let keys = Object.keys(docData);
          let liveMandiRoutes = docData[keys[0]];
          let i;
          for (i = 1; i < keys.length; i++) {
            let value = docData[keys[i]];
            if (value > liveMandiRoutes) liveMandiRoutes = value;
          }
          liveMandiRoutes["Mandi"] = doc.id;
          prl.push(liveMandiRoutes);
        }
      });
      console.log("fetched prl: ", prl);
      dispatch({ type: "STORE_PRL", payload: prl });
      dispatch({ type: "LOADED_PRL" });
    });
  };
};

// dispatch({ type: "LOADING_PRL" });
//       console.log("Current data: ", doc.data());
