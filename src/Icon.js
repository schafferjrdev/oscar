import React from "react";
import disney from "./icons/disney.png";
import netflix from "./icons/netflix.png";
import prime from "./icons/prime.png";
import yts from "./icons/yts.png";
import legenda from "./icons/legenda.png";
import x from "./icons/1337x.png";
import stremio from "./icons/stremio.png";
import youtube from "./icons/youtube.png";
import drive from "./icons/drive.png";
import tport from "./icons/tport.png";

import "./Icons.css";

const Icon = ({ type, url }) => {
  const convertType = {
    disney: disney,
    prime: prime,
    netflix: netflix,
    yts: yts,
    legenda: legenda,
    x: x,
    tport: tport,
    drive: drive,
    youtube: youtube,
    stremio: stremio,
  };
  return type ? (
    <a href={url} target="_blank" rel="noreferrer">
      <img
        className="platform-icon"
        src={convertType[type]}
        alt={`icon of ${type}`}
      />
    </a>
  ) : (
    <></>
  );
};

export default Icon;
