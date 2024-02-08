import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import { Drawer, Switch, Tag } from "antd";
import Countdown from "react-countdown";
import { StarFilled } from "@ant-design/icons";
import oscars_logo from "../icons/oscars.svg";
import { OSCAR_DATE } from "../utils/constants";
import { pluralize, detectMob } from "../utils/functions";

function Settings({ info, darkMode, handleDarkMode, open, onClose }) {
  const watched = info.filter((e) => e.watched);
  const besties = info.filter((e) => e.category.includes("BestPicture"));
  const besties_watched = besties.filter((e) => e.watched);
  const note = info.filter((e) => e.rate > 0).map((e) => e.rate);
  const average = Math.floor(
    note.reduce((acumulador, elemento) => acumulador + elemento, 0) /
      note.length
  );
  const five_stars = info
    .filter((e) => e.rate === 5)
    .map((e) => e.movie.imdb?.split("/")[4]);

  const [fiveStars, setFiveStars] = useState([]);

  const getTMDB = async (uuid) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWUyMWU1NWNjMTg0YzBmNTBkYjc4Njk1NzlhYWE3MCIsInN1YiI6IjY0NDAwZDc1MzdiM2E5MDQ0NTQzMmZhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uB0qMp0SyCG2Lph-6EUJK4eopBlIurD7SdBw8bTb_Uw",
      },
    };
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/find/${uuid}?external_source=imdb_id&language=pt-BR`,
        options
      );
      return response.data?.movie_results[0];
    } catch (error) {
      console.error(`Erro ao buscar dados para o ID ${uuid}:`, error.message);
      throw error; // Rejeita a promessa para que o Promise.all() saiba que algo deu errado
    }
  };

  const fetchDataForAllIds = async () => {
    try {
      const results = await Promise.all(five_stars.map((id) => getTMDB(id)));
      console.log("Dados para todos os IDs:", results);
      setFiveStars(results);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchDataForAllIds();
    // eslint-disable-next-line
  }, [info]);

  return (
    <Drawer
      className='settings-drawer'
      placement={detectMob() ? "bottom" : "right"}
      onClose={onClose}
      closable={false}
      open={open}
    >
      <div className='settings-content'>
        <div className='settings-header'>
          <Switch
            onChange={(e) => handleDarkMode(e)}
            defaultChecked={darkMode}
            checkedChildren={
              <span className='material-icons-outlined switch-icon'>
                dark_mode
              </span>
            }
            unCheckedChildren={
              <span className='material-icons-outlined switch-icon'>
                light_mode
              </span>
            }
          />
        </div>
        <div className='oscars-date settings-box'>
          <div className='ceremony'>
            <img
              src={oscars_logo}
              className='oscars-setting-logo'
              alt='oscar-logo'
            />
            <span className='date-value'>
              {OSCAR_DATE.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
              })}
            </span>
          </div>
          <Countdown
            date={OSCAR_DATE}
            renderer={({ days, hours, minutes, seconds, completed }) => {
              return completed ? null : (
                <span className='remaining'>
                  Faltam {pluralize(days, "dia")}, {pluralize(hours, "hora")} e{" "}
                  {pluralize(minutes, "minuto")}
                </span>
              );
            }}
          />
        </div>

        <div className='settings-box conclusion'>
          <div className='percent-movies'>
            <Tag color='#54788a' className='tag-category'>
              Todos Filmes
            </Tag>
            <span className='percent'>
              {Math.floor((watched.length * 100) / info.length)}%
            </span>
            <span>
              {watched.length}/{info.length} filmes
            </span>
          </div>
          {/* <div className='timespent'>
            <div>
              <span>5</span> dias
            </div>
            <div>
              <span>20</span> horas
            </div>
            <div>
              <span>5</span> minutos
            </div>
          </div> */}

          <div className='percent-movies'>
            <Tag color='gold' className='tag-category'>
              Melhor Filme
            </Tag>
            <span className='percent'>
              {Math.floor((besties_watched.length * 100) / besties.length)}%
            </span>
            <span>
              {besties_watched.length}/{besties.length} filmes
            </span>
          </div>
        </div>

        <div className='settings-box average-stars'>
          <span>
            Seus filmes 5 <StarFilled />
          </span>
          <div className='miniposter-list'>
            {fiveStars.map((i) => (
              <img
                key={i?.poster_path}
                className='miniposter'
                alt='Movie Poster'
                src={`https://image.tmdb.org/t/p/w500${i?.poster_path}`}
              />
            ))}
          </div>
          <hr />
          <span>
            Sua média de notas é {average} <StarFilled /> ({note.length} filmes)
          </span>
        </div>
      </div>
    </Drawer>
  );
}

export default Settings;