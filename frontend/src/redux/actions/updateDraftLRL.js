export const updateDraftLRL = (updatedLRL) => {
  return (dispatch, getState) => {
    dispatch({ type: "UPDATE_DRAFT_LRL", payload: updatedLRL });
  };
};
