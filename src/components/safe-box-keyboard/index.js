import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  keys,
  SAFE_BOX_VALIDATE_PASSWORD_TIMEOUT,
  SAFE_BOX_PASSWORD_LENGTH,
  MASTER_CODE_PASSWORD_LENGTH,
  SAFE_BOX_IDLE_TIMEOUT,
  SERVICE_MODE_PASSWORD,
  SAFE_BOX_LOCKING_TIMEOUT,
} from "../../constants";
import {
  setPassword,
  setIdleState,
  safeBoxError,
  lockingAction,
  unlockingAction,
  activateServiceMode,
  validateMasterCode,
  safeBoxUnlocking,
} from "../../store/actions/actions";
import SafeBoxKey from "./SafeBoxKey";

const SafeBoxKeyboard = () => {
  const {
    isLoading,
    password,
    isLocked,
    currentPassword,
    isServiceMode,
    serialNumber,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [lockingTimer, setLockingTimer] = useState(null);
  const [masterCodeTimer, setMasterCodeTimer] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    setLockingTimer(
      setTimeout(() => {
        (password.length === SAFE_BOX_PASSWORD_LENGTH ||
          password.length >= MASTER_CODE_PASSWORD_LENGTH) &&
          !isLoading &&
          lockUnlockBox();
      }, SAFE_BOX_VALIDATE_PASSWORD_TIMEOUT)
    );
  }, [password]);

  useEffect(() => {
    setIdle();
  }, []);

  const setIdle = () => {
    clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        dispatch(setIdleState());
      }, SAFE_BOX_IDLE_TIMEOUT)
    );
  };

  const addKey = async (value) => {
    if (isLoading) return;

    if (isServiceMode) {
      dispatch(setPassword(value));
      setIdle();

      clearTimeout(masterCodeTimer);
      setMasterCodeTimer(
        setTimeout(() => {
          dispatch(validateMasterCode(password, serialNumber));
        }, SAFE_BOX_LOCKING_TIMEOUT)
      );
      return;
    }

    if (password.length < SAFE_BOX_PASSWORD_LENGTH) {
      setIdle();
      dispatch(setPassword(value));
    }

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

    if (!isLocked && !isServiceMode) {
      dispatch(lockingAction(password));
    } else if (isLocked && !isServiceMode) {
      if (password === currentPassword) {
        dispatch(unlockingAction());
      } else {
        dispatch(safeBoxUnlocking());
        setTimeout(() => {
          dispatch(safeBoxError());
        }, SAFE_BOX_LOCKING_TIMEOUT);
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
