import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Icon from "./Icon";
import Checkwatch from "./Checkwatch";
import StarsDisplay from "./StarsDisplay";
import { LoadingOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useOmdb } from "../hooks/useOmdb";
import { useTmdb } from "../hooks/useTmdb";

function Card({ data, showDrawer, index, handleCheck, search, handleCtx }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const uuid = data?.movie?.imdb;

  const { data: omdb, error: omdbError, isLoading: omdbLoading } = useOmdb(uuid);
  const { data: tmdb, error: tmdbError, isLoading: tmdbLoading } = useTmdb(uuid);

  useEffect(() => {
    if (omdbError) console.error("OMDb error:", omdbError);
    if (tmdbError) console.error("TMDb error:", tmdbError);
  }, [omdbError, tmdbError]);

  const regex = new RegExp(search, "i"); // 'i' makes the search case-insensitive
  const hidden = ![
    omdb?.Actors || "",
    omdb?.Writer || "",
    omdb?.Director || "",
    omdb?.Plot || "",
    omdb?.imdbID || "",
    omdb?.Year || "",
    omdb?.Title || "",
    tmdb?.title || "",
    tmdb?.overview || "",
    tmdb?.original_title || "",
    data?.movie?.name || "",
    data?.category?.join(",") || "",
    data?.platform?.map((e) => e?.name).join(",") || "",
  ].some((str) => regex.test(str));

  const handleShowDrawer = () => {
    // se omdb ainda não chegou, você pode navegar pelo uuid mesmo (imdbId dentro dele)
    // mas se você quer garantir imdbID certo, usa omdb?.imdbID quando existir
    if (omdb?.imdbID) navigate(`/${omdb.imdbID}`);

    showDrawer({
      index,
      data,
      tmdb: tmdb ?? {},
      omdb: omdb ?? {},
    });
  };

useEffect(() => {
    if (!id) return;

    const matchesThisCard = typeof uuid === "string" && uuid.includes(id);
    if (!matchesThisCard) return;

    // só abre quando pelo menos um dos dois já chegou
    if (!omdb && !tmdb) return;

    showDrawer({
      index,
      data,
      tmdb: tmdb ?? {},
      omdb: omdb ?? {},
    });
    // eslint-disable-next-line
  }, [id, uuid, index, data, omdb, tmdb]);

  const isLoading = omdbLoading || tmdbLoading;

  return (
    <Dropdown
      menu={{
        items: [
          {
            label: "Deletar",
            key: "delete",
          },
        ],
        onClick: (e) => handleCtx(data?.id, e),
      }}
      trigger={["contextMenu"]}
    >
      <div
        className={`new-card ${data?.watched ? " checked" : ""} ${
          hidden ? "hidden" : ""
        }`}
      >
        <div>
          {tmdb?.poster_path || omdb?.Poster ? (
            <div className='poster-image-section'>
              <img
                className='poster-image'
                alt='movie_poster'
                loading="lazy"
                decoding="async"
                src={
                  !!tmdb?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${tmdb?.poster_path}`
                    : omdb?.Poster
                }
                title='Clique para marcar que viu!'
                onClick={handleShowDrawer}
              />
              <Checkwatch
                handleCheck={handleCheck}
                index={data?.id}
                value={data?.watched}
                className='checkwatch-card'
              />
              <StarsDisplay stars={data?.rate} className='stars-poster' />
            </div>
          ) : isLoading ? (
            <LoadingOutlined />)
            : (
            <LoadingOutlined />
          )}
        </div>
        <div className='card-data'>
          <p className='card-title' onClick={handleShowDrawer}>
            <span className='card-title-name'>{tmdb?.title} </span>
            <span className='card-title-year'>{omdb?.Year}</span>
          </p>
          <p className='card-subtitle'>
            <span>{omdb?.Runtime}</span>
          </p>

          <p className='plot-text'>
            {!!tmdb?.overview ? tmdb?.overview : omdb?.Plot}
          </p>
          <div>
            {data?.platform?.length > 0
              ? data?.platform?.map((p) => (
                  <Icon
                    key={p.name}
                    type={p.name}
                    url={p.url}
                    debut={p?.debut}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

export default React.memo(Card);
