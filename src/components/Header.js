import React from "react";
import { message, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { detectMob, copyTextToClipboard, detectIOS } from "../utils/functions";
import logo from "../icons/logo.png";
import "./App.scss";

function Header({ movies, openSettings, handleSearch, handleFocus, search }) {
  const handleShare = async () => {
    let text;
    switch (movies.filter((e) => e.watched)?.length) {
      case 0:
        text = "";
        break;
      case 1:
        text = `Eu só vi o filme '${movies
          .filter((e) => e.watched)
          .map((e) => e.movie.name)
          .join(", ")}'`;

        break;
      default:
        text = `Eu já assisti esses aqui: ${movies
          .filter((e) => e.watched)
          .map((e) => e.movie.name)
          .join(", ")}`;
        break;
    }

    const fernandaText =
      "Cê viu a Fernanda Torres? TO-TAL-MEN-TE IN-DI-CA-DA, veja também os filmes em https://oscars.netlify.app\n\n";

    if (detectMob()) {
      try {
        await navigator.share({
          title: text,
          text: fernandaText + text,
          url: "https://oscars.netlify.app",
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      copyTextToClipboard(fernandaText + text);

      message.success("copiado para o ctrl+V");
    }
  };

  const handleSettingsOpen = () => {
    openSettings(true);
  };

  return (
    <>
      <header className='oscar-header'>
        <img src={logo} className='oscar-logo' alt='oscar-logo' />
        <div className='header-action'>
          <Input
            bordered={false}
            className={`search-box ${search?.length > 0 && "opened"}`}
            onChange={handleSearch}
            onFocus={handleFocus}
            value={search}
            prefix={
              <span className='material-icons-outlined header-button'>
                search
              </span>
            }
            suffix={
              <span
                className={`material-icons-outlined header-button ${
                  search?.length === 0 && "hidden"
                }`}
                onClick={handleFocus}
              >
                close
              </span>
            }
          />
          <span
            onClick={handleShare}
            className='material-icons-outlined header-button'
          >
            {detectIOS() ? "ios_share" : "share"}
          </span>
          <UserOutlined
            className='header-button'
            onClick={handleSettingsOpen}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
