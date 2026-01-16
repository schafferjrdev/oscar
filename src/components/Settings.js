import React, {  useMemo } from "react";
import { useSWRConfig, unstable_serialize } from "swr";
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

  const { cache } = useSWRConfig();

const fiveStars = useMemo(() => {
  return five_stars
    .map((imdbId) => {
      const entry = cache.get(unstable_serialize(["tmdb", imdbId, "pt-BR"]));
      return entry?.data ?? null; // ✅ pega o data do SWR
    })
    .filter(Boolean);
}, [five_stars, cache]);

const watchedOmdb = useMemo(() => {
  return runtimes
    .map((imdbId) => {
      const entry = cache.get(unstable_serialize(["omdb", imdbId]));
      return entry?.data ?? null; // ✅ pega o data do SWR
    })
    .filter(Boolean);
}, [runtimes, cache]);

const timespent = useMemo(() => {
  const total = watchedOmdb
    .map((e) => parseInt((e?.Runtime ?? "0").split(" ")[0], 10) || 0)
    .reduce((acc, el) => acc + el, 0);

  return convertMinutesToTimeObject(total);
}, [watchedOmdb]);
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