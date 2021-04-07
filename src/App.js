import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import { Table, Checkbox, Rate, Tag, Tooltip } from "antd";
import Countdown from "react-countdown";
import Icon from "./Icon";
import { NOMINEES } from "./constants";

function App() {
  const [movies, setMovies] = useState([]);

  const dataSource = NOMINEES;

  const VERSION = "1";

  const columns = [
    {
      title: "Filme",
      dataIndex: "movie",
      key: "movie",
      width: 550,
      render: (movie, record, index) => (
        <span className="watched">
          {movie.imdb ? (
            <a
              href={movie.imdb}
              target="_blank"
              rel="noreferrer"
              title="Ir ao imdb"
            >
              <span>{movie.name}</span>
            </a>
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
      width: 150,
      sorter: (a, b) => a.indications - b.indications,
    },
    {
      title: "Onde ver?",
      dataIndex: "platform",
      key: "platform",
      render: (p) => <Icon type={p.name} url={p.url} />,
      width: 150,
    },
    {
      title: "Legenda",
      dataIndex: "subtitle",
      key: "subtitle",
      render: (p) => <Icon type={p ? "legenda" : null} url={p} />,
      width: 150,
    },
    {
      title: "Já assistiu?",
      dataIndex: "watched",
      key: "watched",
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
    // getter
    const v = localStorage.getItem("version");

    if (VERSION > v) {
      console.log(
        "[VERSIONS] Versões diferentes",
        v,
        VERSION,
        "Reinicia os dados"
      );
      setMovies(
        dataSource.map((el, index) => ({
          ...el,
          key: index,
          rate: 0,
          watched: false,
        }))
      );
      localStorage.setItem("version", VERSION);
      localStorage.removeItem("oscar-data");
    } else if (VERSION === v) {
      console.log("[VERSIONS] Versões corretas", v, VERSION);
      const data = localStorage.getItem("oscar-data");

      if (Boolean(data)) {
        console.log("[STORAGE] Atualiza do storage");

        setMovies(JSON.parse(data));
      } else {
        console.log("[STORAGE] Sem storage");

        setMovies(
          dataSource.map((el, index) => ({
            ...el,
            key: index,
            rate: 0,
            watched: false,
          }))
        );
      }
    } else {
      console.log("[VERSIONS] Sem versão definida");
      localStorage.setItem("version", VERSION);
      localStorage.removeItem("oscar-data");
      setMovies(
        dataSource.map((el, index) => ({
          ...el,
          key: index,
          rate: 0,
          watched: false,
        }))
      );
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
        scroll={{ y: 400 }}
      />
    </div>
  );
}

export default App;
