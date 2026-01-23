import useSWR from "swr";
import axios from "axios";

const getImdbId = (uuid) => {
  const match = uuid?.match(/tt\d+/);
  return match?.[0] ?? null;
};

const tmdbOptions = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER}`,
  },
};

const fetchOMDB = async ([_key, imdbId]) => {
  const { data } = await axios.get(
    `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${imdbId}`
  );
  return data;
};

const fetchTMDBWithFallback = async ([_key, imdbId]) => {
  // 1) pt-BR
  const pt = await axios.get(
    `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=pt-BR`,
    tmdbOptions
  );
  const ptMovie = pt.data?.movie_results?.[0] ?? null;

  // se veio ok e tem overview, já retorna
  const hasPtOverview =
    typeof ptMovie?.overview === "string" && ptMovie.overview.trim().length > 0;

  if (ptMovie && hasPtOverview) return ptMovie;

  // 2) fallback en-US (ou sem language)
  const en = await axios.get(
    `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=en-US`,
    tmdbOptions
  );
  const enMovie = en.data?.movie_results?.[0] ?? null;

  // merge: mantém o que pt tiver, completa com en
  // (principalmente overview/title/original_title)
  return {
    ...(enMovie ?? {}),
    ...(ptMovie ?? {}),
    overview: hasPtOverview ? ptMovie.overview : enMovie?.overview ?? ptMovie?.overview ?? "",
    title: ptMovie?.title ?? enMovie?.title ?? "",
    original_title: ptMovie?.original_title ?? enMovie?.original_title ?? "",
  };
};

export function useMovies(imdbUrl) {
  const imdbId = getImdbId(imdbUrl);

  const {
    data: omdb,
    error: omdbError,
    isLoading: omdbLoading,
  } = useSWR(imdbId ? ["omdb", imdbId] : null, fetchOMDB);

  const {
    data: tmdb,
    error: tmdbError,
    isLoading: tmdbLoading,
  } = useSWR(imdbId ? ["tmdb", imdbId] : null, fetchTMDBWithFallback);

  return {
    imdbId,
    omdb,
    tmdb,
    isLoading: omdbLoading || tmdbLoading,
    error: omdbError || tmdbError,
  };
}