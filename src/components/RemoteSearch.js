import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Input, Form } from "antd";
import axios from "axios";

const { Search } = Input;

const TMDB_HEADERS = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_BEARER}`,
  },
};

const searchMovies = async (query) => {
  const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
    ...TMDB_HEADERS,
    params: {
      query,
      language: "pt-BR",
      include_adult: false,
    },
  });
  return res.data?.results ?? [];
};

const getImdbIdFromTmdb = async (tmdbId) => {
  const res = await axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}`, {
    ...TMDB_HEADERS,
    params: { append_to_response: "external_ids" },
  });
  return res.data?.external_ids?.imdb_id ?? null;
};

const RemoteSearch = ({handleSearch, form}) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ evita que respostas antigas sobrescrevam as novas
  const requestIdRef = useRef(0);

  // ✅ cache do imdb para não refazer request do mesmo filme
  const imdbCacheRef = useRef(new Map());

  const fetchWithImdbForTopN = useCallback(async (text) => {
    const trimmed = text.trim();
    if (trimmed.length < 2) {
      setMovies([]);
      return;
    }

    const myRequestId = ++requestIdRef.current;
    setLoading(true);

    try {
      const results = await searchMovies(trimmed);

      // 🔧 Ajuste aqui quantos vão ter IMDb pré-carregado
      const TOP_N = 8;

      const top = results.slice(0, TOP_N);

      const topWithImdb = await Promise.all(
        top.map(async (m) => {
          // cache
          if (imdbCacheRef.current.has(m.id)) {
            return { ...m, imdb_id: imdbCacheRef.current.get(m.id) };
          }
          const imdbId = await getImdbIdFromTmdb(m.id);
          imdbCacheRef.current.set(m.id, imdbId);
          return { ...m, imdb_id: imdbId };
        })
      );

      // Se chegou outra busca depois dessa, ignora
      if (requestIdRef.current !== myRequestId) return;

      // Junta: topo com imdb_id (quando existir) + resto sem (ainda assim dá pra renderizar poster)
      const onlyWithImdb = topWithImdb.filter(m => m.imdb_id);
      setMovies(onlyWithImdb);

    } catch (err) {
      if (requestIdRef.current !== myRequestId) return;
      console.error(err);
      setMovies([]);
    } finally {
      if (requestIdRef.current === myRequestId) setLoading(false);
    }
  }, []);

  // ✅ debounce sem libs
  useEffect(() => {
    const t = setTimeout(() => {
      fetchWithImdbForTopN(query);
    }, 400);

    return () => clearTimeout(t);
  }, [query, fetchWithImdbForTopN]);

  // key estável mesmo sem imdb_id (use tmdb id)
  const posters = useMemo(() => movies.filter((m) => m?.poster_path), [movies]);

  const imdb = Form.useWatch('imdb', form);

  return (
    <>
      <Search
        placeholder="Pesquise aqui um filme"
        className="search-input-box"
        value={query}
        loading={loading}
        onChange={(e) => setQuery(e.target.value)}
        allowClear
      />

      <div className="search-mini-list-grid">
        {posters.map((movie) => (
          <img
            onClick={() => {handleSearch(movie?.imdb_id)}}
            key={`search_movie_${movie.id}`} // ✅ estável
            className={`miniposter search-item-poster${imdb===movie.imdb_id? ' search-item-poster-selected':''}`}
            alt={movie.title ?? "Movie Poster"}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={`${movie.title ?? ""}${movie.imdb_id ? ` • ${movie.imdb_id}` : ""}`}
          />
        ))}
      </div>
    </>
  );
};

export default RemoteSearch;