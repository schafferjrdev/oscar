import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./App.scss";
import Icon from "./Icon";
import Checkwatch from "./Checkwatch";
import StarsDisplay from "./StarsDisplay";
import { nomination_plural, get_imdb_id } from "../utils/functions";
import { LoadingOutlined } from "@ant-design/icons";
import { CATEGORIES } from "../utils/constants";
import { useMovies } from "../hooks/useMovies";

function Card({ data, showDrawer, index, handleCheck, search }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const { omdb, tmdb } = useMovies(data?.movie?.imdb);

  const visto = data?.watched === true ? 'visto': '';
  const categoria = data?.category.map(cat => CATEGORIES[cat]?.title) ?? ''
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
    categoria,
    data?.nominees?.join(",") || "",
    visto,
    data?.platform?.map((e) => e?.name).join(",") || "",
  ].some((str) => regex.test(str));

  const handleShowDrawer = () => {
    navigate(`/${get_imdb_id(data?.movie?.imdb)}`);
    showDrawer({
      index: index,
      data: data,
      tmdb: tmdb,
      omdb: omdb,
    });
  };

  useEffect(() => {
    if (data?.movie.imdb?.includes(id)) {
      showDrawer({
        index: index,
        data: data,
        tmdb: tmdb,
        omdb: omdb,
      });
    }
    // eslint-disable-next-line
  }, [id, data, tmdb, omdb]);

  return (
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
              src={
                !!tmdb?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${tmdb?.poster_path}`
                  : omdb?.Poster
              }
              title='Clique para marcar que viu'
              onClick={handleShowDrawer}
            />
            <Checkwatch
              handleCheck={handleCheck}
              index={index}
              value={data?.watched}
              className='checkwatch-card'
            />
            <StarsDisplay stars={data?.rate} className='stars-poster' />
          </div>
        ) : (
          <LoadingOutlined />
        )}
      </div>
      <div className='card-data'>
        <p className='card-title' onClick={handleShowDrawer}>
          <span className='card-title-name'>{data?.movie.name} </span>
          <span className='card-title-year'>{omdb?.Year}</span>
        </p>
        <p className='card-subtitle'>
          <span>
            {omdb?.Runtime} • {nomination_plural(data?.category?.length)}
          </span>
        </p>

        <p className='plot-text'>
          {!!Boolean(tmdb?.overview.trim()) ? tmdb?.overview : omdb?.Plot}
        </p>
        <div>
          {data?.platform?.length > 0
            ? data?.platform?.map((p) => (
                <Icon key={p.name} type={p.name} url={p.url} debut={p?.debut} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default Card;
