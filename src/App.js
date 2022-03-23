import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import axios from "axios";
import logo from "./logo.png";
import "./App.scss";
import {
  Checkbox,
  Rate,
  Tag,
  Tooltip,
  Popover,
  Card,
  Divider,
  message,
} from "antd";
import Countdown from "react-countdown";
import Icon from "./Icon";
import { LoadingOutlined } from "@ant-design/icons";
import { CATEGORIES } from "./constants";

const { Meta } = Card;

const MovieCard = ({ handleRate, handleCheck, data, index }) => {
  const [omdb, setOmdb] = useState(null);

  const Categories = ({ list = [] }) => {
    return (
      <div className='list-category'>
        {list.map((l, i) => (
          <Tag
            key={`tag_${i}`}
            color={CATEGORIES[l].color}
            className='tag-category'
          >
            {CATEGORIES[l].title}
          </Tag>
        ))}
      </div>
    );
  };

  const getOMDB = async (uuid) => {
    await setOmdb(null);

    axios
      .get(`https://www.omdbapi.com/?apikey=81750ce2&i=${uuid?.split("/")[4]}`)
      .then(function (response) {
        // handle success
        setOmdb(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getOMDB(data?.movie.imdb);
  }, [data]);

  return (
    <Card
      cover={
        omdb?.Poster ? (
          <img
            onClick={() =>
              handleCheck(index, { target: { checked: !data?.watched } })
            }
            className='poster-image'
            alt='movie_poster'
            src={omdb?.Poster}
            title='Clique para marcar que viu'
          />
        ) : (
          <LoadingOutlined />
        )
      }
      loading={!omdb}
      style={{ width: "100%" }}
      className={`movie-card${data?.watched ? " checked" : ""}`}
      actions={
        // data?.subtitle
        //   ? [
        //       <Icon type={data?.platform.name} url={data?.platform.url} />,
        //       <Icon
        //         type={data?.subtitle ? "legenda" : null}
        //         url={data?.subtitle}
        //       />,
        //     ]
        //   : [<Icon type={data?.platform.name} url={data?.platform.url} />]
        [<Icon type={data?.platform.name} url={data?.platform.url} />]
      }
    >
      <Meta
        title={
          <span className='watched'>
            <a
              href={data?.movie.imdb}
              target='_blank'
              rel='noreferrer'
              title='Ir ao imdb'
            >
              <b>{data?.movie.name}</b>
            </a>

            <Tooltip title='Sua nota pessoal' placement='right'>
              <span>
                <Rate
                  allowHalf
                  allowClear
                  onChange={(val) => handleRate(index, val)}
                  value={data?.rate}
                />
              </span>
            </Tooltip>
          </span>
        }
        description={`${omdb?.Title} • ${omdb?.Year} • ${omdb?.Runtime}`}
      />
      <div>
        <div className='movie-plot'>
          <p>
            <b>Sinopse</b>
            {omdb?.Plot}
          </p>
          <p>
            <b>Elenco</b>
            {omdb?.Actors}
          </p>
        </div>
        <Divider />

        <Popover
          title='Indicações'
          content={<Categories list={data?.category} />}
          placement='topRight'
          className='movie-indications'
        >
          <span className='nominees-count'>
            Indicações: {data?.category?.length}
          </span>

          {data?.major && (
            <Tag color={CATEGORIES[data?.major]?.color} className='tag-major'>
              {CATEGORIES[data?.major]?.title}
            </Tag>
          )}
        </Popover>
      </div>
      <div className={`movie-checker${data?.watched ? " watch-checked" : ""}`}>
        <Checkbox
          onChange={(e) => handleCheck(index, e)}
          checked={data?.watched}
          className='watch-checkbox'
        >
          {data?.watched ? null : "Já viu?"}
        </Checkbox>
      </div>
    </Card>
  );
};

function App() {
  const [movies, setMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const moviesRef = ref(database, "movies");

    onValue(
      moviesRef,
      (snapshot) => {
        const data = snapshot.val();

        const storage = localStorage.getItem("oscar-data-2022");
        if (storage) {
          console.log("has oscar local data, loading...");
          const parsed = JSON.parse(storage);
          setMovies(
            data.map((d, i) => ({
              ...d,
              rate: parsed[i]?.rate,
              watched: parsed[i]?.watched,
            }))
          );
        } else {
          console.log("no local data found, loading from server...");
          setMovies(
            data.map((d, i) => ({
              ...d,
              rate: 0,
              watched: false,
            }))
          );
        }
      },
      {
        onlyOnce: true,
      }
    );
    // eslint-disable-next-line
  }, []);

  const handleRate = (index, val) => {
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].rate = val;
      localStorage.setItem("oscar-data-2022", JSON.stringify(newState));
      return newState;
    });
  };

  const handleCheck = (index, e) => {
    const val = e.target.checked;
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].watched = val;
      localStorage.setItem("oscar-data-2022", JSON.stringify(newState));
      return newState;
    });
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

  const oscarDate = new Date("03/27/2022 21:00");

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

  const handleShare = () => {
    let text;
    switch (movies.filter((e) => e.watched).length) {
      case 0:
        text = `Ainda não vi nenhum\n\nMarque você também em https://oscars.netlify.app`;
        break;
      case 1:
        text = `Eu só vi ${movies
          .filter((e) => e.watched)
          .map((e) => e.movie.name)
          .join(", ")}\n\nMarque você também em https://oscars.netlify.app`;

        break;
      default:
        text = `Eu já assisti esses aqui: ${movies
          .filter((e) => e.watched)
          .map((e) => e.movie.name)
          .join(", ")}\n\nMarque você também em https://oscars.netlify.app`;
        break;
    }

    copyTextToClipboard(text);
    message.success("Texto copiado!");
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
        ios_share
      </span>
      <header className='oscar-header'>
        <img src={logo} className='oscar-logo' alt='oscar-logo' />
        <span>Checklist para o Oscar 2022</span>

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
