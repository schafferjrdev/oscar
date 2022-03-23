import React, { useState, useEffect } from "react";
import { database, checkMovie, rateMovie } from "./firebase";
import { ref, onValue } from "firebase/database";
import axios from "axios";
import logo from "./logo.png";
import "./App.scss";
import { Checkbox, Rate, Tag, Tooltip, Popover, Card, Divider } from "antd";
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
        data?.platform.url
          ? [<Icon type={data?.platform.name} url={data?.platform.url} />]
          : null
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
        setMovies(data);
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

  return (
    <div className='oscar-body'>
      <span
        onClick={handleDarkMode}
        className='material-icons-outlined dark-button'
      >
        {darkMode ? "light_mode" : "dark_mode"}
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
