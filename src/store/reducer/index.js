import {
  SET_NEW_PASSWORD,
  SAFE_BOX_LOCKING,
  SAFE_BOX_LOCKED,
  SET_IDLE_STATE,
  SAFE_BOX_UNLOCKED,
  SAFE_BOX_UNLOCKING,
  SAFE_BOX_ERROR,
  ACTIVATE_SERVICE_MODE,
  MASTER_CODE_VALIDATING,
  MASTER_CODE_VALIDATION_SUCCESSFULL,
} from "../action-types";

const SafeBoxState = {
  currentPassword: "",
  password: "",
  isLocked: false,
  status: "Ready",
  isLoading: false,
  isIdle: false,
  isServiceMode: false,
  serialNumber: 4815162342,
};

const reducer = (state = SafeBoxState, { payload, type }) => {
  switch (type) {
    case SET_NEW_PASSWORD:
      return { ...state, password: state.password + payload, isIdle: false };
    case SAFE_BOX_LOCKING:
      return {
        ...state,
        status: "Locking",
        currentPassword: payload,
        password: "",
        isLoading: true,
      };

    case SAFE_BOX_LOCKED:
      return {
        ...state,
        isLocked: true,
        status: "Ready",
        password: "",
        isLoading: false,
      };
    case SAFE_BOX_UNLOCKING:
      return {
        ...state,
        status: "Unlocking",
        currentPassword: payload,
        password: "",
        isLoading: true,
      };
    case SAFE_BOX_UNLOCKED:
      return {
        ...state,
        isLocked: false,
        status: "Ready",
        password: "",
        isLoading: false,
      };

    case SAFE_BOX_ERROR:
      return {
        ...state,
        status: "Error",
        password: "",
        isLoading: false,
      };
    case SET_IDLE_STATE:
      return { ...state, isIdle: true };
    case ACTIVATE_SERVICE_MODE:
      return {
        ...state,
        isServiceMode: true,
        status: "Service",
        password: "",
      };
    case MASTER_CODE_VALIDATING:
      return {
        ...state,
        status: "Validating",
        isLoading: true,
        password: "",
      };
    case MASTER_CODE_VALIDATION_SUCCESSFULL:
      return {
        ...state,
        password: "",
        currentPassword: "",
        status: "Ready",
        isLoading: false,
        isLocked: false,
        isServiceMode: false,
      };
    default:
      return state;
  }
};

export default reducer;
