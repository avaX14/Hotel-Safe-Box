import { SAFE_BOX_LOCKING_TIMEOUT } from "../../constants";
import { validateCode } from "../../services/httpService";
import {
  SET_NEW_PASSWORD,
  SAFE_BOX_LOCKING,
  SAFE_BOX_LOCKED,
  SAFE_BOX_UNLOCKING,
  SAFE_BOX_UNLOCKED,
  SET_IDLE_STATE,
  SAFE_BOX_ERROR,
  ACTIVATE_SERVICE_MODE,
  MASTER_CODE_VALIDATING,
  MASTER_CODE_VALIDATION_SUCCESSFULL,
} from "../action-types";

export const setPassword = (payload) => {
  return {
    type: SET_NEW_PASSWORD,
    payload: payload,
  };
};

export const safeBoxLocking = (payload) => {
  return {
    type: SAFE_BOX_LOCKING,
    payload: payload,
  };
};

export const safeBoxUnlocked = () => {
  return {
    type: SAFE_BOX_UNLOCKED,
  };
};

export const safeBoxUnlocking = (payload) => {
  return {
    type: SAFE_BOX_UNLOCKING,
    payload: payload,
  };
};

export const safeBoxLocked = () => {
  return {
    type: SAFE_BOX_LOCKED,
  };
};

export const setIdleState = () => {
  return {
    type: SET_IDLE_STATE,
  };
};

export const safeBoxError = () => {
  return {
    type: SAFE_BOX_ERROR,
  };
};

export const activateServiceMode = () => {
  return {
    type: ACTIVATE_SERVICE_MODE,
  };
};

export const masterCodeValidating = () => {
  return {
    type: MASTER_CODE_VALIDATING,
  };
};

export const masterCodeValidationSuccessfull = () => {
  return {
    type: MASTER_CODE_VALIDATION_SUCCESSFULL,
  };
};

export const lockingAction = (password) => {
  return (dispatch) => {
    dispatch(safeBoxLocking(password));
    setTimeout(() => {
      dispatch(safeBoxLocked());
    }, SAFE_BOX_LOCKING_TIMEOUT);
  };
};

export const unlockingAction = (password) => {
  return (dispatch) => {
    dispatch(safeBoxUnlocking(password));
    setTimeout(() => {
      dispatch(safeBoxUnlocked());
    }, SAFE_BOX_LOCKING_TIMEOUT);
  };
};

export const validateMasterCode = (password, serialNumber) => {
  return (dispatch) => {
    dispatch(masterCodeValidating());
    validateCode(password)
      .then(({ data }) => {
        setTimeout(() => {
          if (data.sn === serialNumber) {
            dispatch(masterCodeValidationSuccessfull());
          } else {
            dispatch(safeBoxError());
          }
        }, SAFE_BOX_LOCKING_TIMEOUT);
      })
      .catch(() => {
        dispatch(safeBoxError());
      });
  };
};
