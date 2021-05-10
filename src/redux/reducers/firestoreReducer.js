const initState = {
  prlIsLoading: true,
  prl: [],
  draftLRL: [],
  lrlIsUpLoading: false,
  lrl: [],
  aucTimingIsLoading: false,
  aucTimings: {StartTime: -1, EndTime: -1},
  errors: ""
};

const firestoreReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING_PRL":
      return {
        ...state,
        prlIsLoading: true,
      };
    case "LOADED_PRL":
      return {
        ...state,
        prlIsLoading: false,
      };
    case "STORE_PRL":
      return {
        ...state,
        prl: action.payload,
      };
    case "UPDATE_DRAFT_LRL":
      return {
        ...state,
        draftLRL: action.payload,
      };
    case "LRL_IS_UPLOADING":
      return {
        ...state,
        lrlIsUpLoading: true,
      };
    case "LRL_IS_UPLOADED":
      return {
        ...state,
        lrlIsUpLoading: false,
      };
      case "LRL_UPLOADING_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_LRL":
      return {
        ...state,
        lrl: action.payload,
      };
    case "AUC_TIME_IS_LOADING":
      return {
        ...state,
        aucTimingIsLoading: true,
      };
    case "AUC_TIME_IS_LOADED":
      return {
        ...state,
        aucTimingIsLoading: false,
      };
    case "FETCH_AUC_TIMINGS":
      return {
        ...state,
        aucTimings: action.payload,
      };
      case "FETCH_AUC_TIMINGS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default firestoreReducer;
