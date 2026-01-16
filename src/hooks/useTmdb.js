import useSWR from "swr";
import { extractImdbId, fetchTMDbByImdb } from "../api/moviesApis";

export function useTmdb(uuid) {
  const imdbId = extractImdbId(uuid);

  return useSWR(
    imdbId ? ["tmdb", imdbId, "pt-BR"] : null,
    () => fetchTMDbByImdb(imdbId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
    }
  );
}