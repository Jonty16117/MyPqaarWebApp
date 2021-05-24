import {
  AUCTIONS_INFO,
  SCHEDULED_AUCTIONS,
  BONUS_TIMINGS,
  LIVE_AUCTION_LIST,
  LIVE_AUCTION_LIST_RECORDS,
  LIVE_ROUTES_LIST,
  LIVE_ROUTES_LIST_RECORDS,
} from "../../utils/consts.js";

const CHUNKED_LIST_SIZE = 200;
const chunkList = (a, n) =>
  [...Array(Math.ceil(a.length / n))].map((_, i) => a.slice(n * i, n + n * i));

const closeAuction = () => {
  return (dispatch, getState, { getFirestore }) => {
    dispatch({ type: "CLOSING_AUCTION" });
    let closingTime = Date.now();
    let closedAuctionData = {};
    let lal = {};
    let allLALDocsIds = [];
    let lrl = {};
    let allLRLDocsIds = [];
    const firestore = getFirestore();

    //update auctions info
    firestore
      .collection(AUCTIONS_INFO)
      .doc(SCHEDULED_AUCTIONS)
      .update({ StartTime: 0, EndTime: 0 });

    //update bonus time info
    firestore
      .collection(AUCTIONS_INFO)
      .doc(BONUS_TIMINGS)
      .update({ StartTime: 0, EndTime: 0 });

    //clean live auction list
    //get current live auction list
    firestore
      .collection(LIVE_AUCTION_LIST)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id !== "DummyDoc") {
            lal[doc.id] = {
              Closed: doc.data().Closed,
              Src: doc.data().Src,
              Des: doc.data().Des,
              TruckNo: doc.data().TruckNo,
              CurrNo: doc.data().CurrNo,
              PrevNo: doc.data().PrevNo,
            };
            allLALDocsIds.push(doc.id);
          }
          lal["Timestamp"] = closingTime;

          //   console.log("lal: ", lal);
          //   console.log("allLALDocsIds: ", allLALDocsIds);
          //upload live auction list to cloud records
          firestore
            .collection(LIVE_AUCTION_LIST_RECORDS)
            .doc(closingTime.toString())
            .set(lal)
            .then(() => {
              //delete all trucks from live auction list in batches
              chunkList(allLALDocsIds, CHUNKED_LIST_SIZE).forEach(
                (listChunk) => {
                  let batch = firestore.batch();
                  let col = firestore.collection(LIVE_AUCTION_LIST);
                  listChunk.forEach((listItem) => {
                    batch.delete(col.doc(listItem));
                  });
                  //execute batch
                  batch.commit();
                }
              );
            });

          //then clean live routes list
          //get current live routes list
          firestore
            .collection(LIVE_ROUTES_LIST)
            .get()
            .then((querySnapshot) => {
              lrl = {};
              querySnapshot.forEach((doc) => {
                if (doc.id !== "DummyDoc") {
                  allLRLDocsIds.push(doc.id);
                  let [src, des, dataType] = doc.id.split("-");
                  if (src in lrl) {
                    if (des in lrl[src]) {
                      lrl[src][des][dataType] = doc.data().Value;
                    } else {
                      lrl[src][des] = {};
                      lrl[src][des][dataType] = doc.data().Value;
                    }
                  } else {
                    lrl[src] = {};
                    lrl[src][des] = {};
                    lrl[src][des][dataType] = doc.data().Value;
                  }
                }
              });
              lrl["Timestamp"] = firestore.Timestamp.fromDate(
                new Date(closingTime)
              );

              //upload live routes list to cloud records
              firestore
                .collection(LIVE_ROUTES_LIST_RECORDS)
                .doc(closingTime.toString())
                .set(lrl)
                .then(() => {
                  //delete all routes from live routes list in batches
                  chunkList(allLRLDocsIds, CHUNKED_LIST_SIZE).forEach(
                    (listChunk) => {
                      let batch = firestore.batch();
                      let col = firestore.collection(LIVE_ROUTES_LIST);
                      listChunk.forEach((listItem) => {
                        batch.delete(col.doc(listItem));
                      });
                      //execute batch
                      batch.commit();
                    }
                  );
                });

              closedAuctionData = {
                ClosedTime: closingTime,
                LiveAuctionListRecord: lal,
                LiveRoutesListRecord: lrl,
              };
              dispatch({ type: "CLOSED_AUCTION", payload: closedAuctionData });
            });
        });
      });
  };
};

export default closeAuction;
