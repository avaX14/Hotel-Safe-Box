import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SafeBoxDisplay = (props) => {
  const { isLocked, status, password, isIdle } = useSelector((state) => state);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      className={
        !isIdle ? "safe-box-display" : "safe-box-display safe-box-display-idle"
      }
    >
      <p className="safe-box-display-locked">
        {!isLocked ? "Unlocked" : "Locked"}
      </p>
      <p className="safe-box-display-state">
        {!password.length ? status : password}
      </p>
    </div>
  );
};

export default SafeBoxDisplay;
