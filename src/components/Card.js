import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Icon from "./Icon";
import Checkwatch from "./Checkwatch";
import StarsDisplay from "./StarsDisplay";
import { nomination_plural } from "../utils/functions";
import { LoadingOutlined } from "@ant-design/icons";

function Card({ data, showDrawer, index, handleCheck }) {
  const [omdb, setOmdb] = useState(null);
  const [tmdb, setTmdb] = useState(null);

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
        console.error(error);
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
        console.error(error);
      });
  };

  useEffect(() => {
    getOMDB(data?.movie.imdb);
    getTMDB(data?.movie.imdb);
  }, [data]);

  const handleShowDrawer = () => {
    showDrawer({
      index: index,
      data: data,
      tmdb: tmdb,
      omdb: omdb,
    });
  };

  return (
    <div className={`new-card ${data?.watched ? " checked" : ""}`}>
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
}

export default Card;