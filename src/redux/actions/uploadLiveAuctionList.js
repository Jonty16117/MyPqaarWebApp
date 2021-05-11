import { LIVE_AUCTION_LIST } from "../../utils/consts.js";

const CHUNKED_LIST_SIZE = 200;
const chunkList = (a, n) =>
  [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

export const uploadLiveAuctionList = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "UPLOADING_LIVE_AUCTION_LIST" });

    const firestore = getFirestore();
    const col = firestore.collection(LIVE_AUCTION_LIST);
    let noBatchError = true;
    let batchError = "";

    //set operations in batch
    let draftLAL = getState().firestore.draftLiveAuctionList;
    chunkList(draftLAL, CHUNKED_LIST_SIZE).forEach((listChunk) => {
      let batch = firestore.batch();
      listChunk.forEach((listItem) => {
        batch.set(col.doc(listItem.CurrNo), listItem);
      });
      //upload batch
      batch
        .commit()
        .then(() => {
          noBatchError = noBatchError && true;
          console.log("uploaded batch: ", listChunk)
        })
        .catch((error) => {
          noBatchError = false;
          batchError = error
        });
    });

    dispatch({ type: "UPLOADED_LIVE_AUCTION_LIST" });
    if (!noBatchError) {
      dispatch({ type: "UPLOADING_LIVE_AUCTION_LIST_ERROR", payload: batchError });
    }
  };
};
