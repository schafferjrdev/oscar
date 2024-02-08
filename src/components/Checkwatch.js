import React from "react";
import "./App.scss";

import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

function Checkwatch({ handleCheck, index, value, className }) {
  return (
    <span
      className={`checkbox-watch ${value ? "" : "not-seen"} ${className}`}
      onClick={() => handleCheck(index, !value)}
    >
      {value ? <EyeFilled /> : <EyeInvisibleFilled />}
    </span>
  );
}

export default Checkwatch;
