import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./App.scss";
import { Drawer, Switch, Tag, Button } from "antd";
import Countdown from "react-countdown";
import { StarFilled } from "@ant-design/icons";
import oscars_logo from "../icons/oscars.svg";
import Down from "../icons/Down";
import spotify from "../icons/spotify_2026.png";
import { OSCAR_DATE } from "../utils/constants";
import {
  pluralize,
  pluralize_word,
  detectMob,
  convertMinutesToTimeObject,
} from "../utils/functions";

import { useMovies } from "../hooks/useMovies";

/**
 * Loader invisível que usa o hook (um por imdbId) e
 * "sobe" os dados pro Settings via callback.
 */
function MovieMetaLoader({ imdbId, enabled, onMeta }) {
  // seu hook extrai tt\d+ via regex, então passar "tt123..." já funciona
  const { omdb, tmdb } = useMovies(enabled ? imdbId : null);

  useEffect(() => {
    if (!enabled || !imdbId) return;
    if (omdb || tmdb) onMeta(imdbId, { omdb, tmdb });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, imdbId, omdb, tmdb]);

  return null;
}

function Settings({ info, darkMode, handleDarkMode, open, onClose }) {
  const navigate = useNavigate();

  const watched = info.filter((e) => e.watched);
  const besties_movies = info.filter((e) => e.category.includes("BestPicture"));
  const besties_watched = besties_movies.filter((e) => e.watched);

  const not_watched = useMemo(() => info.filter((e) => !e.watched), [info]);

  const note = info.filter((e) => e.rate > 0).map((e) => e.rate);
  const average =
    note.length === 0
      ? 0
      : note.reduce((acc, n) => acc + n, 0) / note.length;

  // IDs normalizados (match retorna array -> pega [0])
  const five_stars_ids = useMemo(
    () =>
      info
        .filter((e) => e.rate === 5)
        .map((e) => e.movie.imdb?.match(/tt\d+/)?.[0])
        .filter(Boolean),
    [info]
  );

  const runtimes_ids = useMemo(
    () =>
      watched
        .map((e) => e.movie.imdb?.match(/tt\d+/)?.[0])
        .filter(Boolean),
    [watched]
  );

  const besties_ids = useMemo(
    () =>
      watched
        .filter((e) => e.category.includes("BestPicture"))
        .map((e) => e.movie.imdb?.match(/tt\d+/)?.[0])
        .filter(Boolean),
    [watched]
  );

  // união dos ids que precisamos carregar no Settings
  const neededIds = useMemo(() => {
    const set = new Set([
      ...five_stars_ids,
      ...runtimes_ids,
      ...besties_ids,
    ]);
    return Array.from(set);
  }, [five_stars_ids, runtimes_ids, besties_ids]);

  // Map id -> { omdb, tmdb }
  const [metaById, setMetaById] = useState({});

  const handleMeta = useCallback((imdbId, meta) => {
    setMetaById((prev) => {
      const prevItem = prev[imdbId] || {};
      // merge sem apagar o que já existe
      return {
        ...prev,
        [imdbId]: {
          ...prevItem,
          ...meta,
          omdb: meta.omdb ?? prevItem.omdb,
          tmdb: meta.tmdb ?? prevItem.tmdb,
        },
      };
    });
  }, []);

  // Derivados: posters best picture / 5 estrelas
  const bestMovies = useMemo(() => {
    return besties_ids
      .map((id) => metaById[id]?.tmdb)
      .filter(Boolean)
      .filter((m) => Boolean(m?.poster_path));
  }, [besties_ids, metaById]);

  const fiveStars = useMemo(() => {
    return five_stars_ids
      .map((id) => metaById[id]?.tmdb)
      .filter(Boolean)
      .filter((m) => Boolean(m?.poster_path));
  }, [five_stars_ids, metaById]);

  const [timespent, setTimespent] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  // Recalcula tempo conforme runtimes forem chegando no cache
  useEffect(() => {
    if (!open) return;

    const totalMinutes = runtimes_ids
      .map((id) => metaById[id]?.omdb?.Runtime) // "123 min"
      .map((runtime) => {
        const n = parseInt(String(runtime || "").split(" ")[0], 10);
        return Number.isFinite(n) ? n : 0;
      })
      .reduce((acc, n) => acc + n, 0);

    setTimespent(convertMinutesToTimeObject(totalMinutes));
  }, [open, runtimes_ids, metaById]);

  // opcional: ao fechar, você pode manter o cache do SWR,
  // mas limpar o metaById pra reduzir memória do componente.
  useEffect(() => {
    if (!open) return;
    // quando abre, não faz nada
  }, [open]);

  return (
    <Drawer
      className='settings-drawer'
      placement={detectMob() ? "bottom" : "right"}
      onClose={onClose}
      closable={false}
      open={open}
    >
      {/* loaders invisíveis: só buscam se o Drawer estiver aberto */}
      {neededIds.map((id) => (
        <MovieMetaLoader
          key={id}
          imdbId={id}
          enabled={open}
          onMeta={handleMeta}
        />
      ))}

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

          <Button
            className='form-button'
            type='link'
            onClick={() => {
              if (not_watched.length === 0) return;

              const sorteado =
                not_watched[Math.floor(Math.random() * not_watched.length)];
              const imdb = sorteado?.movie?.imdb?.match(/tt\d+/)?.[0];
              if (!imdb) return;

              onClose();
              navigate(`/${imdb}`);
            }}
          >
            Estou com sorte? :D
          </Button>

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
            renderer={({ days, hours, minutes, completed }) => {
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
              {Math.floor((watched?.length * 100) / info.length)}%
            </span>
            <span>
              {watched?.length}/{info?.length} filmes
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

        <div className='settings-box minilist-categories'>
          <div className='percent-movies'>
            <Tag color='gold' className='tag-category no-margin'>
              Melhor Filme
            </Tag>
            <span>
              {besties_watched.length}/{besties_movies.length} filmes
            </span>
            <span className='percent'>
              {Math.floor(
                (besties_watched.length * 100) / besties_movies.length
              )}
              %
            </span>
          </div>

          <div className='miniposter-list'>
            {bestMovies.map((i) => (
              <img
                key={`${i?.poster_path}_besties`}
                className='miniposter'
                alt='Movie Poster'
                src={`https://image.tmdb.org/t/p/w500${i?.poster_path}`}
              />
            ))}
          </div>
        </div>

        <div className='settings-box average-stars'>
          {note.length === 0 ? (
            <div>
              Você ainda não marcou <StarFilled /> nos filmes...
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
                        key={`${i?.poster_path}_five`}
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
                Total de <b>{note.length}</b>{" "}
                {pluralize_word(note.length, "filme")}
                {pluralize_word(note.length, " avaliado")}
              </span>
            </>
          )}
        </div>

        <div className='settings-box spotify-button'>
          <a
            href='https://open.spotify.com/playlist/7dqeBKHaCghOQ0WWSf2vMo?si=8a34c075b6fa41c5'
            rel='noreferrer'
            target='_blank'
          >
            <img alt='Playlist do Spotify' src={spotify} />
          </a>
        </div>
      </div>
    </Drawer>
  );
}

export default Settings;