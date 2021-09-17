import { LIVE_AUCTION_LIST, LIVE_TRUCK_DATA_LIST } from "../../utils/consts.js";

const CHUNKED_LIST_SIZE = 200;
const chunkList = (a, n) =>
  [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

export const uploadLiveAuctionList = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "UPLOADING_LIVE_AUCTION_LIST" });

    const firestore = getFirestore();
    const col = firestore.collection(LIVE_AUCTION_LIST);
    let liveTruckDataList = getState().firestore.liveTruckDataList;
    let auctionId = getState().firestore.aucTimings.StartTime;
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
          console.log("uploaded batch: ", listChunk);
        })
        .catch((error) => {
          noBatchError = false;
          batchError = error;
          dispatch({
            type: "UPLOADING_LIVE_AUCTION_LIST_ERROR",
            payload: batchError,
          });
        });
    });

    // update the entries of each truck in live truck data list (in batches ofcourse)
    //get all trucks from current live auction list
    let trucksInDraftLiveAuctionList = [];
    draftLAL.forEach((aucItem) => {
      trucksInDraftLiveAuctionList.push({
        TruckNo: aucItem.TruckNo,
        CurrentListNo: aucItem.CurrNo,
      });
    });
    //make batches and upload
    chunkList(trucksInDraftLiveAuctionList, CHUNKED_LIST_SIZE).forEach(
      (listChunk) => {
        let batch = firestore.batch();
        listChunk.forEach((listItem) => {
          batch.update(
            firestore.collection(LIVE_TRUCK_DATA_LIST).doc(listItem.TruckNo),
            {
              CurrentListNo: listItem.CurrentListNo,
              AuctionId: auctionId,
            }
          );
        });
        batch
        .commit()
        .then(() => {
          noBatchError = noBatchError && true;
          console.log("uploaded batch: ", listChunk);
        })
        .catch((error) => {
          noBatchError = false;
          batchError = error;
          dispatch({
            type: "UPLOADING_LIVE_AUCTION_LIST_ERROR",
            payload: batchError,
          });
        });
      }
    );

    dispatch({ type: "UPLOADED_LIVE_AUCTION_LIST" });
    if (!noBatchError) {
      dispatch({
        type: "UPLOADING_LIVE_AUCTION_LIST_ERROR",
        payload: batchError,
      });
    }
  };
};
