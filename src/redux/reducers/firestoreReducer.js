const initState = {
  prlIsLoading: true,
  prl: [],
  draftLRL: [],
  lrlIsUpLoading: false,
  lrl: [],
  aucTimingIsLoading: false,
  aucTimings: { StartTime: -1, EndTime: -1 },
  errors: "",

  liveTruckDataList: new Map(),
  fetchedLiveTruckDataList: false,

  lastAucListDoc: new Map(),
  fetchedLastAucListDoc: false,

  pahunchs: new Map(),
  fetchedPahunchs: false,

  trucksInLastAuc: new Map(),
  draftLiveAuctionList: {},
  draftedLiveAuctionList: false,

  uploadingLAL: false,
  uploadedLAL: false,
  uploadingLALError: "",

  updatingLRL: false,
  verifyingNewBidReq: false,
  verifiedNewBidReq: "",
};

const firestoreReducer = (state = initState, action) => {
  switch (action.type) {
    case "VERIFYING_NEW_BID_REQUEST":
      return { ...state, verifyingNewBidReq: true };
    case "VERIFIED_NEW_BID_REQUEST":
      return {
        ...state,
        verifyingNewBidReq: false,
        verifiedNewBidReq: action.payload,
      };
    case "UPDATING_LIVE_ROUTES_LIST":
      return { ...state, uploadingLALError: true };
    case "UPDATED_LIVE_ROUTES_LIST":
      return { ...state, uploadingLALError: false };
    case "UPLOADING_LIVE_AUCTION_LIST_ERROR":
      return { ...state, uploadingLALError: action.payload };
    case "UPLOADING_LIVE_AUCTION_LIST":
      return { ...state, uploadingLAL: true, uploadedLAL: false };
    case "UPLOADED_LIVE_AUCTION_LIST":
      return { ...state, uploadingLAL: false, uploadedLAL: true };
    case "DRAFTING_LIVE_AUCTION_LIST":
      return { ...state, draftedLiveAuctionList: false };
    case "DRAFTED_LIVE_AUCTION_LIST":
      return { ...state, draftedLiveAuctionList: true };
    case "STORE_DRAFTED_LIVE_AUCTION_LIST":
      return { ...state, draftLiveAuctionList: action.payload };
    case "LOADING_PAHUNCHS":
      return { ...state, fetchedPahunchs: false };
    case "LOADED_PAHUNCHS":
      return { ...state, fetchedPahunchs: true };
    case "FETCHED_PAHUNCHS":
      return { ...state, pahunchs: action.payload };
    case "LOADING_LAST_AUCTION_LIST":
      return { ...state, fetchedLastAucListDoc: false };
    case "LOADED_LAST_AUCTION_LIST":
      return { ...state, fetchedLastAucListDoc: true };
    case "FETCHED_LAST_AUCTION_LIST":
      return { ...state, lastAucListDoc: action.payload };
    case "LOADING_LIVE_TRUCK_DATA_LIST":
      return { ...state, fetchedLiveTruckDataList: false };
    case "LOADED_LIVE_TRUCK_DATA_LIST":
      return { ...state, fetchedLiveTruckDataList: true };
    case "FETCHED_LIVE_TRUCK_DATA_LIST":
      return { ...state, liveTruckDataList: action.payload };
    case "LOADING_PRL":
      return { ...state, prlIsLoading: true };
    case "LOADED_PRL":
      return { ...state, prlIsLoading: false };
    case "STORE_PRL":
      return { ...state, prl: action.payload };
    case "UPDATE_DRAFT_LRL":
      return { ...state, draftLRL: action.payload };
    case "LRL_IS_UPLOADING":
      return { ...state, lrlIsUpLoading: true };
    case "LRL_IS_UPLOADED":
      return { ...state, lrlIsUpLoading: false };
    case "LRL_UPLOADING_ERROR":
      return { ...state, error: action.payload };
    case "FETCH_LRL":
      return { ...state, lrl: action.payload };
    case "AUC_TIME_IS_LOADING":
      return { ...state, aucTimingIsLoading: true };
    case "AUC_TIME_IS_LOADED":
      return { ...state, aucTimingIsLoading: false };
    case "FETCH_AUC_TIMINGS":
      return { ...state, aucTimings: action.payload };
    case "FETCH_AUC_TIMINGS_ERROR":
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};

export default firestoreReducer;
