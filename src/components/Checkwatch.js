import React from "react";
import "./App.scss";

import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

function Checkwatch({ handleCheck, index, value }) {
  return (
    <span
      className={`checkbox-watch ${value ? "" : "not-seen"}`}
      onClick={() => handleCheck(index, !value)}
    >
      {value ? <EyeFilled /> : <EyeInvisibleFilled />}
    </span>
  );
}

export default Checkwatch;
