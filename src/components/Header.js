import React from "react";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { detectMob, copyTextToClipboard, detectIOS } from "../utils/functions";
import logo from "../icons/logo.png";
import "./App.scss";

function Header({ movies, openSettings }) {
  const handleShare = async () => {
    let text;
    switch (movies.filter((e) => e.watched).length) {
      case 0:
        text = `Ainda não vi nenhum`;
        break;
      case 1:
        text = `Eu só vi ${movies
          .filter((e) => e.watched)
          .map((e) => e.movie.name)
          .join(", ")}`;

        break;
      default:
        text = `Eu já assisti esses aqui: ${movies
          .filter((e) => e.watched)
          .map((e) => e.movie.name)
          .join(", ")}`;
        break;
    }

    if (detectMob()) {
      try {
        await navigator.share({
          title: text,
          text: text,
          url: "https://oscars.netlify.app",
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      copyTextToClipboard(
        text + " \n\nMarque você também em https://oscars.netlify.app"
      );

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