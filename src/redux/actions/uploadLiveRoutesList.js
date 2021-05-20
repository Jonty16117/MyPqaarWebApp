import { LIVE_ROUTES_LIST } from "../../utils/consts.js";

export const uploadLiveRoutesList = (lrl) => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "LRL_IS_UPLOADING" });

    const firestore = getFirestore();
    const col = firestore.collection(LIVE_ROUTES_LIST);
    const batch = firestore.batch();

    //set operations in batch
    lrl.forEach((lrlItem) => {
      lrlItem.Routes.forEach((route) => {
        let docName = `${lrlItem.Mandi}-${route.Des}`;
        batch.set(col.doc(`${docName}-Got`), {Value: 0})
        batch.set(col.doc(`${docName}-Req`), {Value: route.Req})
        batch.set(col.doc(`${docName}-Rate`), {Value: route.Rate})
      })
    })

    //upload batch
    batch
      .commit()
      .then(() => {
        // console.log("uploaded batch: ", lrl)
        dispatch({ type: "FETCH_LRL", payload: lrl });
        dispatch({ type: "LRL_IS_UPLOADED" });
      })
      .catch((error) => {
        // console.error("Error updating document: ", error);
        let err = "Error fetching auction timings!";
        dispatch({ type: "LRL_UPLOADING_ERROR", payload: err });
      });
  };
};
