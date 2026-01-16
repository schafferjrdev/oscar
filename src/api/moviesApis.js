import axios from "axios";

export const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;
export const TMDB_BEARER = `Bearer ${process.env.REACT_APP_TMDB_BEARER}`;

export function extractImdbId(uuid) {
  const match = uuid?.match(/tt\d+/);
  return match?.[0] ?? null;
}

export async function fetchOMDb(imdbId) {
  const { data } = await axios.get(
    `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}`
  );
  return data;
}

export async function fetchTMDbByImdb(imdbId) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id&language=pt-BR`,
    {
      headers: {
        accept: "application/json",
        Authorization: TMDB_BEARER,
      },
    }
  );
  return data?.movie_results?.[0] ?? null;
}