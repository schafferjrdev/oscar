import React from "react";
import disney from "./icons/disney.webp";
import netflix from "./icons/netflix.webp";
import prime from "./icons/prime.webp";
import youtube from "./icons/youtube.png";
import cinema from "./icons/cinema.png";
import hbo from "./icons/hbo.webp";
import stars from "./icons/stars.webp";
import globo from "./icons/globo.webp";
import mubi from "./icons/mubi.webp";
import apple from "./icons/apple.webp";
import vimeo from "./icons/vimeo.png";
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
    globo: globo,
    mubi: mubi,
    apple: apple,
    cinema: cinema,
    vimeo: vimeo,
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
