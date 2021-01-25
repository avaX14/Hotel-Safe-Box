import React from "react";
import { useSelector } from "react-redux";
import SafeBoxDisplay from "../safe-box-display";
import SafeBoxKeyboard from "../safe-box-keyboard";

export default function SafeBoxContainer() {
  const serialNumber = useSelector((state) => state.serialNumber);
  return (
    <div className="safe-box-container">
      <SafeBoxDisplay></SafeBoxDisplay>
      <SafeBoxKeyboard></SafeBoxKeyboard>
      <span className="safe-box-container-serial-number">
        S/N: {serialNumber}
      </span>
    </div>
  );
}
