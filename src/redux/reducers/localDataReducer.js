const initState = {
  draftLRL: [],
};

const localDataReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_DRAFT_LRL":
      return {
        ...state,
        draftLRL: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default localDataReducer;

