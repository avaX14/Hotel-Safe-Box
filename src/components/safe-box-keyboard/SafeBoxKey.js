import React from "react";
import { useSelector } from "react-redux";
import { renderKeySubItem } from "../../utils/helpers";

const SafeBoxKey = ({ keyValue, onClickCallback, disabled }) => {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div
      className={
        disabled || isLoading
          ? "safe-box-key safe-box-key-idle"
          : "safe-box-key"
      }
      aria-disabled={disabled}
      onClick={() => onClickCallback(keyValue)}
    >
      <h1 className="safe-box-key-value">{keyValue}</h1>
      {renderKeySubItem(keyValue)}
    </div>
  );
};

export default SafeBoxKey;
