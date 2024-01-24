import React, { useState, useEffect } from "react";
import { database, checkMovie, rateMovie } from "./firebase";
import { ref, onValue } from "firebase/database";
import logo from "./logo.png";
import "./App.scss";
import { message } from "antd";
import Countdown from "react-countdown";
import MovieCard from "./Card";

function App() {
  const [movies, setMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const moviesRef = ref(database, "movies");

    onValue(moviesRef, (snapshot) => {
      const data = snapshot.val();
      setMovies(data);
    });
    // eslint-disable-next-line
  }, []);

  const handleRate = (index, val) => {
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].rate = val;
      return newState;
    });
    rateMovie(val, index);
  };

  const handleCheck = (index, e) => {
    const val = e.target.checked;
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].watched = val;
      return newState;
    });
    checkMovie(val, index);
  };

  useEffect(() => {
    const dark = localStorage.getItem("dark-mode");
    const body = document.querySelector("body");
    if (dark === "true") {
      setDarkMode(dark === "true");
      body.classList.add("dark-mode");
    }
    // eslint-disable-next-line
  }, []);

  const oscarDate = new Date("03/10/2024 21:00");

  const pluralize = (number, word) => {
    return number > 1 ? `${number} ${word}s` : `${number} ${word}`;
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode", !darkMode);

    localStorage.setItem("dark-mode", !darkMode);
  };

  function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if the element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a
    // flash, so some of these are just precautions. However in
    // Internet Explorer the element is visible whilst the popup
    // box asking the user for permission for the web page to
    // copy to the clipboard.
    //

    // Place in the top-left corner of screen regardless of scroll position.
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

    const shareData = {
      title: "Oscars 2024",
      text: text,
      url: "https://oscars.netlify.app",
    };

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
        await navigator.share(shareData);
      } catch (err) {
        copyTextToClipboard(
          text + "\n\nMarque você também em https://oscars.netlify.app"
        );
        message.success("Texto copiado!");

        console.log(err);
      }
    } else {
      copyTextToClipboard(
        text + "\n\nMarque você também em https://oscars.netlify.app"
      );

      message.success("Texto copiado!");
    }
  };

  const detectIOS = () => {
    const toMatch = [/iPhone/i, /iPad/i, /iPod/i];
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  };

  return (
    <div className='oscar-body'>
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
        <span>Checklist para o Oscar 2024</span>

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
      <div className='movie-list'>
        {movies.map((movie, index) => (
          <MovieCard
            handleRate={handleRate}
            handleCheck={handleCheck}
            data={movie}
            index={index}
            key={`movies_${index}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
