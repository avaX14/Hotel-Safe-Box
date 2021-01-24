import React from "react";
import SafeBoxDisplay from "../safe-box-display";
import SafeBoxKeyboard from "../safe-box-keyboard";

export default function SafeBoxContainer() {
  return (
    <div className="safe-box-container">
      <SafeBoxDisplay></SafeBoxDisplay>
      <SafeBoxKeyboard></SafeBoxKeyboard>
    </div>
  );
}
