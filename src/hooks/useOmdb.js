import useSWR from "swr";
import { extractImdbId, fetchOMDb } from "../api/moviesApis";

export function useOmdb(uuid) {
  const imdbId = extractImdbId(uuid);

  return useSWR(
    imdbId ? ["omdb", imdbId] : null,
    () => fetchOMDb(imdbId),
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
    }
  );
}