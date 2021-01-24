import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  keys,
  SAFE_BOX_VALIDATE_PASSWORD_TIMEOUT,
  SAFE_BOX_PASSWORD_LENGTH,
  MASTER_CODE_PASSWORD_LENGTH,
  SAFE_BOX_IDLE_TIMEOUT,
  SERVICE_MODE_PASSWORD,
} from "../../constants";
import {
  setPassword,
  setIdleState,
  safeBoxError,
  lockingAction,
  unlockingAction,
  activateServiceMode,
  validateMasterCode,
} from "../../store/actions/actions";
import SafeBoxKey from "./SafeBoxKey";

const SafeBoxKeyboard = () => {
  const {
    isLoading,
    password,
    isIdle,
    isLocked,
    currentPassword,
    isServiceMode,
    serialNumber,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  let lockingTimer = null;
  let timer = null;

  useEffect(() => {
    lockingTimer = setTimeout(() => {
      (password.length === SAFE_BOX_PASSWORD_LENGTH ||
        password.length >= MASTER_CODE_PASSWORD_LENGTH) &&
        !isLoading &&
        lockUnlockBox();
    }, SAFE_BOX_VALIDATE_PASSWORD_TIMEOUT);
  }, [password]);

  const setIdle = () => {
    console.log("TIMEOUT", isIdle);
    clearTimeout(timer);

    timer = setTimeout(() => {
      dispatch(setIdleState());
    }, SAFE_BOX_IDLE_TIMEOUT);
  };

  const addKey = async (value) => {
    if (isLoading) return;

    if (isServiceMode) {
      dispatch(setPassword(value));
      return;
    }

    console.log("PROSAO DALJE");

    if (password.length < SAFE_BOX_PASSWORD_LENGTH)
      dispatch(setPassword(value));

    if (password.length === SAFE_BOX_PASSWORD_LENGTH && value === "L") {
      clearTimeout(lockingTimer);
      lockUnlockBox();
    }
  };

  const serviceMode = () => {
    dispatch(activateServiceMode());
  };

  const lockUnlockBox = () => {
    if (password === SERVICE_MODE_PASSWORD && !isServiceMode && isLocked) {
      serviceMode();
      return;
    }

    if (password.length >= MASTER_CODE_PASSWORD_LENGTH && isServiceMode) {
      dispatch(validateMasterCode(password, serialNumber));
      return;
    }

    if (!isLocked && !isServiceMode) {
      dispatch(lockingAction(password));
    } else if (isLocked && !isServiceMode) {
      if (password === currentPassword) {
        dispatch(unlockingAction(password));
      } else {
        dispatch(safeBoxError());
      }
    }
  };

  return (
    <div className="safe-box-keyboard">
      {keys.map((item, index) => (
        <SafeBoxKey
          key={index}
          keyValue={item}
          disabled={isLoading}
          onClickCallback={addKey}
        />
      ))}
    </div>
  );
};

export default SafeBoxKeyboard;
