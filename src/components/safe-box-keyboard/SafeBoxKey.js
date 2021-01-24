import React from "react";
import { useSelector } from "react-redux";
import UpArrow from "../../assets/icons/up-arrow.svg";
import DownArrow from "../../assets/icons/down-arrow.svg";
import LeftArrow from "../../assets/icons/left-arrow.svg";
import RightArrow from "../../assets/icons/right-arrow.svg";

const renderSubitem = (key) => {
  switch (key) {
    case 8:
      return (
        <img
          src={UpArrow}
          className="safe-box-key-subvalue safe-box-key-subvalue-icon"
          alt="up-arrow"
        />
      );
    case 4:
      return (
        <img
          src={LeftArrow}
          className="safe-box-key-subvalue safe-box-key-subvalue-icon"
          alt="left-arrow"
        />
      );
    case 6:
      return (
        <img
          src={RightArrow}
          className="safe-box-key-subvalue safe-box-key-subvalue-icon"
          alt="right-arrow"
        />
      );

    case 2:
      return (
        <img
          src={DownArrow}
          className="safe-box-key-subvalue safe-box-key-subvalue-icon"
          alt="down-arrow"
        />
      );
    case "*":
      return <span className="safe-box-key-subvalue">B</span>;
    case "L":
      return <span className="safe-box-key-subvalue">A</span>;

    default:
      break;
  }
};

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
      {renderSubitem(keyValue)}
    </div>
  );
};

export default SafeBoxKey;
