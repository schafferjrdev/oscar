import React from "react";
import disney from "../icons/disney.webp";
import netflix from "../icons/netflix.webp";
import prime from "../icons/prime.webp";
import youtube from "../icons/youtube.png";
import cinema from "../icons/cinema.png";
import max from "../icons/max.png";
import stars from "../icons/stars.webp";
import globo from "../icons/globo.webp";
import mubi from "../icons/mubi.webp";
import apple from "../icons/apple.webp";
import vimeo from "../icons/vimeo.png";
import ingresso from "../icons/ingresso.png";
import ticket from "../icons/img-debut-ticket.png";
// import yts from "./icons/yts.png";
// import legenda from "./icons/legenda.png";
// import x from "./icons/1337x.png";
// import stremio from "./icons/stremio.png";
// import drive from "./icons/drive.png";
// import tport from "./icons/tport.png";

import "./Icons.css";

const Icon = ({ type, url, debut }) => {
  const convertType = {
    disney: disney,
    prime: prime,
    netflix: netflix,
    youtube: youtube,
    hbo: max,
    stars: stars,
    globo: globo,
    mubi: mubi,
    apple: apple,
    cinema: cinema,
    vimeo: vimeo,
    ingresso: ingresso,
    debut: ticket,
    // yts: yts,
    // legenda: legenda,
    // x: x,
    // tport: tport,
    // drive: drive,
    // stremio: stremio,
  };
  return convertType[type] ? (
    url ? (
      <a href={url} target='_blank' rel='noreferrer'>
        <img
          className='platform-icon'
          src={convertType[type]}
          alt={`icon of ${type}`}
        />
      </a>
    ) : (
      <>
        <img
          className='platform-icon'
          src={convertType[type]}
          alt={`icon of ${type}`}
        />
        <span className='banner-body'>{debut}</span>
      </>
    )
  ) : null;
};

export default Icon;
