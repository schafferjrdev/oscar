import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { Drawer, Switch, Tag, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import Down from "../icons/Down";
import {
  pluralize_word,
  detectMob,
  convertMinutesToTimeObject,
} from "../utils/functions";

function Settings({ info, darkMode, handleDarkMode, open, onClose }) {
  const navigate = useNavigate();

  // ✅ Remove buracos (null/undefined) que surgem por remoção sem "shift" de índices
  const safeInfo = useMemo(() => (info ?? []).filter(Boolean), [info]);

  const watched = useMemo(() => safeInfo.filter((e) => e.watched), [safeInfo]);
  const not_watched = useMemo(() => safeInfo.filter((e) => !e.watched), [safeInfo]);

  const note = useMemo(
    () => safeInfo.filter((e) => e.rate > 0).map((e) => e.rate),
    [safeInfo]
  );

  const average = useMemo(() => {
    if (note.length === 0) return 0;
    return note.reduce((acc, el) => acc + el, 0) / note.length;
  }, [note]);

  // ids prontos como string "tt123..."
  const five_stars = useMemo(
    () =>
      safeInfo
        .filter((e) => e.rate === 5)
        .map((e) => e.movie?.imdb?.match(/tt\d+/)?.[0])
        .filter(Boolean),
    [safeInfo]
  );

  const runtimes = useMemo(
    () =>
      watched
        .map((e) => e.movie?.imdb?.match(/tt\d+/)?.[0])
        .filter(Boolean),
    [watched]
  );

  const [fiveStars, setFiveStars] = useState([]);
  const [timespent, setTimespent] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const getTMDB = useCallback(async (uuid) => {
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
      return response.data?.movie_results?.[0] ?? null;
    } catch (error) {
      console.error(`Erro ao buscar TMDB para o ID ${uuid}:`, error.message);
      throw error;
    }
  }, []);

  const getOMDB = useCallback(async (uuid) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=81750ce2&i=${uuid}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar OMDB para o ID ${uuid}:`, error.message);
      throw error;
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    try {
      // posters dos 5 estrelas
      const posters = five_stars.length
        ? await Promise.all(five_stars.map((id) => getTMDB(id)))
        : [];

      // runtime do que foi assistido
      const time = runtimes.length
        ? await Promise.all(runtimes.map((id) => getOMDB(id)))
        : [];

      const all_time = time.length
        ? time
            .map((e) => parseInt((e?.Runtime ?? "0").split(" ")[0], 10) || 0)
            .reduce((acc, el) => acc + el, 0)
        : 0;

      setTimespent(convertMinutesToTimeObject(all_time));
      setFiveStars(posters.filter(Boolean));
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }, [five_stars, runtimes, getTMDB, getOMDB]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

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
          {detectMob() ? (
            <Down
              onClick={(e) => onClose(e)}
              alt='Icon Caret Down'
              className='caret down'
            />
          ) : (
            <span
              onClick={(e) => onClose(e)}
              className='material-icons-outlined caret left'
            >
              arrow_back_ios_new
            </span>
          )}
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

        <div className='settings-box conclusion'>
          <div className='percent-movies'>
            <Tag color='#54788a' className='tag-category'>
              Todos Filmes
            </Tag>
            <span className='percent'>
              {safeInfo.length === 0
                ? "0%"
                : `${Math.floor((watched.length * 100) / safeInfo.length)}%`}
            </span>
            <span>
              {watched.length}/{safeInfo.length} filmes
            </span>
          </div>

          <div className='timespent'>
            <div>
              <b>
                <span>Tempo Total Visto</span>
              </b>
            </div>
            <div>
              <span>{timespent.days}</span>{" "}
              {pluralize_word(timespent.days, "dia")}
            </div>
            <div>
              <span>{timespent.hours}</span>{" "}
              {pluralize_word(timespent.hours, "hora")}
            </div>
            <div>
              <span>{timespent.minutes}</span>{" "}
              {pluralize_word(timespent.minutes, "minuto")}
            </div>
          </div>
        </div>

        <div className='settings-box average-stars'>
          {note.length === 0 ? (
            <div>
              Vocês ainda não marcaram <StarFilled /> nos filmes...
            </div>
          ) : (
            <>
              {fiveStars.length > 0 ? (
                <>
                  <span>
                    Seus filmes 5 <StarFilled />
                  </span>
                  <div className='miniposter-list'>
                    {fiveStars.map((i) => (
                      <img
                        key={i?.poster_path ?? Math.random()}
                        className='miniposter'
                        alt='Movie Poster'
                        src={`https://image.tmdb.org/t/p/w500${i?.poster_path}`}
                      />
                    ))}
                  </div>
                  <hr />
                </>
              ) : null}

              <span>
                Sua média de notas é {average.toFixed(1)} <StarFilled />
              </span>
              <span>
                Total de <b>{note.length}</b> {pluralize_word(note.length, "filme")}
                {pluralize_word(note.length, " avaliado")}
              </span>
            </>
          )}
        </div>

        <div className='settings-box lucky-button'>
          <Button
            className='form-button'
            onClick={() => {
              if (not_watched.length === 0) return;

              const sorteado = not_watched[Math.floor(Math.random() * not_watched.length)];
              const imdb = sorteado?.movie?.imdb?.match(/tt\d+/)?.[0];
              if (!imdb) return;

              onClose();
              navigate(`/${imdb}`);
            }}
          >
            Estou com sorte? :D
          </Button>
        </div>
      </div>
    </Drawer>
  );
}

export default Settings;