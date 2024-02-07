import React from "react";
import logo from "./logo.png";
import { message } from "antd";
import "./App.scss";
import Countdown from "react-countdown";

function Header({ movies, darkMode, handleDarkMode }) {
  const oscarDate = new Date("03/10/2024 21:00");

  const pluralize = (number, word) => {
    return number > 1 ? `${number} ${word}s` : `${number} ${word}`;
  };
  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = "2em";
    textArea.style.height = "2em";

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = "transparent";

    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Copying text command was " + msg);
    } catch (err) {
      console.log("Oops, unable to copy");
    }

    document.body.removeChild(textArea);
  }

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

    function detectMob() {
      const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];
      const IE = window.innerWidth <= 800 && window.innerHeight <= 600;
      const others = toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
      });

      return others || IE;
    }

    console.log(detectMob());
    if (detectMob()) {
      try {
        await navigator.share({
          title: text,
          text: text,
          url: "https://oscars.netlify.app",
        });
      } catch (err) {
        // copyTextToClipboard(
        //   text + "\n\nMarque você também em https://oscars.netlify.app"
        // );
        // message.success("copiado para o ctrl+V");

        console.log(err);
      }
    } else {
      copyTextToClipboard(
        text + " \n\nMarque você também em https://oscars.netlify.app"
      );

      message.success("copiado para o ctrl+V");
    }
  };

  const detectIOS = () => {
    const toMatch = [/iPhone/i, /iPad/i, /iPod/i];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };
  return (
    <>
      <span
        onClick={handleDarkMode}
        className='material-icons-outlined dark-button'
      >
        {darkMode ? "light_mode" : "dark_mode"}
      </span>
      <span
        onClick={handleShare}
        className='material-icons-outlined share-button'
      >
        {detectIOS() ? "ios_share" : "share"}
      </span>
      <header className='oscar-header'>
        <img src={logo} className='oscar-logo' alt='oscar-logo' />

        <span className='countdown-span'>
          <Countdown
            date={oscarDate}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              return completed ? null : (
                <span>
                  Faltam {pluralize(days, "dia")}, {pluralize(hours, "hora")} e{" "}
                  {pluralize(minutes, "minuto")}
                </span>
              );
            }}
          />
        </span>
      </header>
    </>
  );
}

export default Header;
