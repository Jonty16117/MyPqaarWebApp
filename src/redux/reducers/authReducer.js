const initState = {
  isLoggedIn: null,
  sentRegisterRequest: null,
  sentResetMail: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "REGISTER_SUCCESSFUL":
      return {
        ...state,
        sentRegisterRequest: true,
      };
    case "REGISTER_FAILED":
      return {
        ...state,
        sentRegisterRequest: false,
      };
    case "SENT_RESET_MAIL":
      return {
        ...state,
        sentResetMail: true,
      };
    case "FAILED_TO_SENT_RESET_MAIL":
      return {
        ...state,
        sentResetMail: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
