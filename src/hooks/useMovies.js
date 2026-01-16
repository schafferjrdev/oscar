import useSWR from "swr";
import { database } from "../db/firebase";
import { ref, onValue } from "firebase/database";

export function useMovies() {
  return useSWR(
    "movies",
    () =>
      new Promise((resolve, reject) => {
        try {
          const moviesRef = ref(database, "movies");

          // pega snapshot inicial
          const unsub = onValue(
            moviesRef,
            (snap) => {
              const val = snap.val() || {};
              const list = Object.entries(val).map(([id, data]) => ({
                id,
                ...data,
              }));
              resolve(list);
              unsub(); // resolve 1 vez só
            },
            (err) => reject(err)
          );
        } catch (e) {
          reject(e);
        }
      }),
    {
      revalidateOnFocus: false,
    }
  );
}