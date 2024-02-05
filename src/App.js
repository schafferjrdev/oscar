import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import axios from "axios";
import logo from "./logo.png";
import "./App.scss";
import { message, Drawer, Rate, Popover, Tag } from "antd";
import Countdown from "react-countdown";
import Icon from "./Icon";
import {
  LoadingOutlined,
  CloseOutlined,
  EyeFilled,
  EyeInvisibleFilled,
  StarFilled,
} from "@ant-design/icons";
import CaretDown from "./icons/CaretDown.svg";
import { LOCAL_STORAGE_KEY, CATEGORIES } from "./constants";

const MovieCard = ({ handleRate, handleCheck, data, index }) => {
  const [omdb, setOmdb] = useState(null);
  const [tmdb, setTmdb] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const showDrawer = (e) => {
    console.log("openning drawer");
    console.log("drawer flag", drawerOpen);
    e.preventDefault();
    setDrawerOpen(true);
  };

  const onClose = (e) => {
    console.log("closing drawer");
    e.preventDefault();
    setDrawerOpen(false);
  };

  const getOMDB = async (uuid) => {
    await setOmdb(null);
    const imdb = uuid?.split("/")[4];
    axios
      .get(`https://www.omdbapi.com/?apikey=81750ce2&i=${imdb}`)
      .then(function (response) {
        // handle success
        setOmdb(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const getTMDB = async (uuid) => {
    await setTmdb(null);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWUyMWU1NWNjMTg0YzBmNTBkYjc4Njk1NzlhYWE3MCIsInN1YiI6IjY0NDAwZDc1MzdiM2E5MDQ0NTQzMmZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uB0qMp0SyCG2Lph-6EUJK4eopBlIurD7SdBw8bTb_Uw",
      },
    };
    const imdb = uuid?.split("/")[4];

    axios
      .get(
        `https://api.themoviedb.org/3/find/${imdb}?external_source=imdb_id&language=pt-BR`,
        options
      )
      .then(function (response) {
        // handle success
        setTmdb(response.data?.movie_results[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  useEffect(() => {
    getOMDB(data?.movie.imdb);
    getTMDB(data?.movie.imdb);
  }, [data]);

  useEffect(() => {
    console.log("drawer open?", drawerOpen);
  }, [drawerOpen]);

  return (
    <div className={`new-card ${data?.watched ? " checked" : ""}`}>
      <Drawer
        placement='bottom'
        onClose={onClose}
        closable={false}
        open={drawerOpen}
      >
        <div className='movie-details'>
          <div className='drawer-backdrop mobile'>
            <div className='drawer-actions'>
              <span
                className={`checkbox-watch ${data?.watched ? "" : "not-seen"}`}
                onClick={() => handleCheck(index)}
              >
                {data?.watched ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
              <img
                onClick={(e) => onClose(e)}
                src={CaretDown}
                alt='Icon Caret Down'
              />
            </div>
            <div className='backdrop-drawer-image'></div>
            <img
              className='drawer-image'
              alt='movie_poster'
              src={
                !!tmdb?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${tmdb?.backdrop_path}`
                  : omdb?.Poster
              }
            />

            <div className='drawer-header'>
              <p className='drawer-name'>
                <span>
                  <b className='drawer-main'>{data?.movie.name}</b>
                  <span className='drawer-sub'>{omdb?.Year}</span>
                </span>
                <span>
                  <i className='drawer-sub'>{omdb?.Title}</i>
                </span>
              </p>
              <Rate
                allowHalf
                allowClear
                onChange={(val) => handleRate(index, val)}
                value={data?.rate}
              />
            </div>
            <div className='banner-information'>
              <div className='banner-upper'>
                <p className='banner-subtitle'>
                  {omdb?.Runtime} • {omdb?.Genre}
                </p>
              </div>
              <div className='movie-plot'>
                <p>
                  <span className='banner-body'>{tmdb?.overview}</span>
                </p>
                {data?.platform.url ? (
                  <>
                    <hr />
                    <p className='banner-topic'>WATCH NOW</p>

                    <Icon type={data?.platform.name} url={data?.platform.url} />
                  </>
                ) : null}
                <hr />
                <div>
                  <p className='banner-topic'>CAST & CREW</p>
                  <p>
                    <b>Director</b>
                    <span className='banner-body'>{omdb?.Director}</span>
                  </p>
                  <p>
                    <b>Writers</b>
                    <span className='banner-body'>{omdb?.Writer}</span>
                  </p>
                  <p>
                    <b>Stars</b>
                    <span className='banner-body'>{omdb?.Actors}</span>
                  </p>

                  <hr />
                  <p className='banner-topic awards'>
                    <span>AWARDS & NOMANATIONS</span>
                    <Popover
                      title='Indicações'
                      content={<Categories list={data?.category} />}
                      placement='left'
                      className='movie-indications'
                    >
                      {data?.category && (
                        <Tag
                          color={CATEGORIES[data?.category[0]]?.color}
                          className='tag-major'
                        >
                          {CATEGORIES[data?.category[0]]?.title}
                        </Tag>
                      )}
                    </Popover>
                  </p>
                  <p>
                    <b>Oscar</b>
                    <span className='banner-body'>
                      {data?.category?.length} indicações
                    </span>
                  </p>
                  <p>
                    <b>Premiações</b>
                    <span className='banner-body'>{omdb?.Awards}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='movie-banner desktop'>
            <CloseOutlined
              className='close-button'
              onClick={(e) => onClose(e)}
            />

            <img
              className='banner-image'
              alt='movie_poster'
              src={
                !!tmdb?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${tmdb?.backdrop_path}`
                  : omdb?.Poster
              }
            />
            <div className='banner-backdrop'>
              <div className='banner-content'>
                <img
                  className='banner-poster-image'
                  alt='movie_poster'
                  src={
                    !!tmdb?.poster_path
                      ? `https://image.tmdb.org/t/p/original${tmdb?.poster_path}`
                      : omdb?.Poster
                  }
                />
                <span
                  className={`checkbox-watch ${
                    data?.watched ? "" : "not-seen"
                  }`}
                  onClick={() => handleCheck(index)}
                >
                  {data?.watched ? <EyeFilled /> : <EyeInvisibleFilled />}
                </span>
                <div className='banner-information'>
                  <div className='banner-upper'>
                    <span className='banner-title'>
                      <span className='banner-name'>{data?.movie.name}</span>
                      <span>
                        <Rate
                          allowHalf
                          allowClear
                          onChange={(val) => handleRate(index, val)}
                          value={data?.rate}
                        />
                      </span>
                    </span>
                    <span className='banner-subtitle'>
                      {omdb?.Title} • {omdb?.Year} • {omdb?.Runtime} •{" "}
                      {omdb?.Genre}
                    </span>
                  </div>
                  <div className='movie-plot'>
                    <p>
                      <span className='banner-body'>{tmdb?.overview}</span>
                    </p>
                    {data?.platform.url ? (
                      <>
                        <hr />
                        <p className='banner-topic'>WATCH NOW</p>

                        <Icon
                          type={data?.platform.name}
                          url={data?.platform.url}
                        />
                      </>
                    ) : null}
                    <hr />
                    <div>
                      <p className='banner-topic'>CAST & CREW</p>
                      <p>
                        <b>Director</b>
                        <span className='banner-body'>{omdb?.Director}</span>
                      </p>
                      <p>
                        <b>Writers</b>
                        <span className='banner-body'>{omdb?.Writer}</span>
                      </p>
                      <p>
                        <b>Stars</b>
                        <span className='banner-body'>{omdb?.Actors}</span>
                      </p>

                      <hr />
                      <p className='banner-topic awards'>
                        <span>AWARDS & NOMANATIONS</span>
                        <Popover
                          title='Indicações'
                          content={<Categories list={data?.category} />}
                          placement='left'
                          className='movie-indications'
                        >
                          {data?.category && (
                            <Tag
                              color={CATEGORIES[data?.category[0]]?.color}
                              className='tag-major'
                            >
                              {CATEGORIES[data?.category[0]]?.title}
                            </Tag>
                          )}
                        </Popover>
                      </p>
                      <p>
                        <b>Oscar</b>
                        <span className='banner-body'>
                          {data?.category?.length} indicações
                        </span>
                      </p>
                      <p>
                        <b>Premiações</b>
                        <span className='banner-body'>{omdb?.Awards}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <div onClick={(e) => showDrawer(e)}>
        {tmdb?.poster_path || omdb?.Poster ? (
          <div className='poster-image-section'>
            <img
              className='poster-image'
              alt='movie_poster'
              src={
                !!tmdb?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${tmdb?.poster_path}`
                  : omdb?.Poster
              }
              title='Clique para marcar que viu'
            />
            <span
              className={`checkbox-watch ${data?.watched ? "" : "not-seen"}`}
            >
              {data?.watched ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
        ) : (
          <LoadingOutlined />
        )}
      </div>
      <div className='card-data'>
        <p className='card-title'>
          <span className='card-title-name'>{data?.movie.name} </span>
          <span className='card-title-year'>{omdb?.Year}</span>
        </p>
        <p className='card-subtitle'>
          {omdb?.Runtime} • {data?.category?.length} indicações
          {data?.rate > 0 ? (
            <>
              {" "}
              • <span> {data?.rate} </span> <StarFilled />
            </>
          ) : null}
        </p>

        <p className='plot-text'>
          {!!tmdb?.overview ? tmdb?.overview : omdb?.Plot}
        </p>
        <div>
          {data?.platform.url ? (
            <Icon type={data?.platform.name} url={data?.platform.url} />
          ) : null}
        </div>
      </div>
    </div>
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

        const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
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
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const handleCheck = (index) => {
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].watched = !newState[index].watched;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
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
