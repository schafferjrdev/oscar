import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.png";
import "./App.css";
import { Table, Checkbox, Rate, Tag, Tooltip, Popover } from "antd";
import Countdown from "react-countdown";
import Icon from "./Icon";
import { CATEGORIES, NOMINEES } from "./constants";
import { LoadingOutlined } from "@ant-design/icons";

function App() {
  const [movies, setMovies] = useState([]);
  const [omdb, setOmdb] = useState(null);

  const dataSource = NOMINEES;

  const Categories = ({ list = [] }) => {
    return (
      <div className="list-category">
        {list.map((l) => (
          <Tag color={CATEGORIES[l].color} className="tag-category">
            {CATEGORIES[l].title}
          </Tag>
        ))}
      </div>
    );
  };

  const content = omdb ? (
    <div>
      <img
        className="omdb-poster"
        alt={`${omdb?.Title}_Poster`}
        src={omdb?.Poster}
      />
      <p className="omdb-plot">
        {omdb?.Title} &bull; {omdb?.Runtime}
      </p>
      <p className="omdb-plot">{omdb?.Plot}</p>
      <p className="omdb-plot">{omdb?.Actors}</p>
    </div>
  ) : (
    <LoadingOutlined />
  );

  const getOMDB = async (uuid) => {
    await setOmdb(null);

    axios
      .get(`https://www.omdbapi.com/?apikey=81750ce2&i=${uuid.split("/")[4]}`)
      .then(function (response) {
        // handle success
        setOmdb(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Filme",
      dataIndex: "movie",
      key: "movie",
      width: "35vw",
      render: (movie, record, index) => (
        <span className="watched">
          {movie.imdb ? (
            <Popover content={content} placement="right">
              <a
                href={movie.imdb}
                target="_blank"
                rel="noreferrer"
                title="Ir ao imdb"
                onMouseEnter={() => getOMDB(movie.imdb)}
              >
                <span>{movie.name}</span>
              </a>
            </Popover>
          ) : (
            <span>{movie.name}</span>
          )}
          {record.bestPicture && (
            <Tag color="gold" className="tag-category">
              MELHOR FILME
            </Tag>
          )}
          <Tooltip title="Sua nota pessoal" placement="right">
            <span>
              <Rate
                allowHalf
                allowClear
                onChange={(val) => handleRate(index, val)}
                value={record.rate}
              />
            </span>
          </Tooltip>
        </span>
      ),
    },
    {
      title: "Indicações",
      dataIndex: "indications",
      key: "indications",
      render: (movie, record) => (
        <Popover
          title="Indicações"
          content={<Categories list={record.category} />}
          placement="right"
        >
          <span className="movie-indications">{movie}</span>
        </Popover>
      ),
      width: "10vw",
    },
    {
      title: "Onde ver?",
      dataIndex: "platform",
      key: "platform",
      render: (p) => <Icon type={p.name} url={p.url} />,
      width: "10vw",
    },
    {
      title: "Legenda",
      dataIndex: "subtitle",
      key: "subtitle",
      render: (p) => <Icon type={p ? "legenda" : null} url={p} />,
      width: "10vw",
    },
    {
      title: "Já assistiu?",
      dataIndex: "watched",
      key: "watched",
      width: "10vw",
      render: (_, record, index) => (
        <Checkbox
          onChange={(e) => handleCheck(index, e)}
          checked={record.watched}
        />
      ),
    },
  ];

  const handleRate = (index, val) => {
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].rate = val;
      localStorage.setItem("oscar-data", JSON.stringify(newState));
      return newState;
    });
  };

  const handleCheck = (index, e) => {
    const val = e.target.checked;
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].watched = val;
      localStorage.setItem("oscar-data", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("oscar-data");
    if (data) {
      const parsed = JSON.parse(data);

      setMovies(
        dataSource.map((d, i) => ({
          rate: parsed[i].rate,
          watched: parsed[i].watched,
          ...d,
        }))
      );
    } else {
      setMovies(dataSource);
    }

    // eslint-disable-next-line
  }, []);

  const oscarDate = new Date("04/25/2021 21:00");

  const pluralize = (number, word) => {
    return number > 1 ? `${number} ${word}s` : `${number} ${word}`;
  };

  return (
    <div className="oscar-body">
      <header className="oscar-header">
        <img src={logo} className="oscar-logo" alt="oscar-logo" />
        <span>Checklist para o Oscar 2021</span>

        <span className="countdown-span">
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
      <Table
        dataSource={movies}
        columns={columns}
        pagination={false}
        scroll={{ y: 400, x: 1200 }}
      />
    </div>
  );
}

export default App;
