import React from "react";
import disney from "./icons/disney.png";
import netflix from "./icons/netflix.png";
import prime from "./icons/prime.png";
import youtube from "./icons/youtube.png";
import hbo from "./icons/hbo.png";
import stars from "./icons/stars.png";
// import yts from "./icons/yts.png";
// import legenda from "./icons/legenda.png";
// import x from "./icons/1337x.png";
// import stremio from "./icons/stremio.png";
// import drive from "./icons/drive.png";
// import tport from "./icons/tport.png";

import "./Icons.css";

const Icon = ({ type, url }) => {
  const convertType = {
    disney: disney,
    prime: prime,
    netflix: netflix,
    youtube: youtube,
    hbo: hbo,
    stars: stars,
    // yts: yts,
    // legenda: legenda,
    // x: x,
    // tport: tport,
    // drive: drive,
    // stremio: stremio,
  };
  return convertType[type] ? (
    <a href={url} target='_blank' rel='noreferrer'>
      <img
        className='platform-icon'
        src={convertType[type]}
        alt={`icon of ${type}`}
      />
    </a>
  ) : null;
};

export default Icon;
