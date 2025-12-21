// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove, update } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFGokMQx-_stk9CEJ_V8wCG-5N-nKXE70",
  authDomain: "filmin-f90ad.firebaseapp.com",
  projectId: "filmin-f90ad",
  storageBucket: "filmin-f90ad.firebasestorage.app",
  messagingSenderId: "30845965692",
  appId: "1:30845965692:web:64ea0636897bc2ede980f9",
  measurementId: "G-KW6131SQPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);
const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    console.log("Usuário autenticado");
  })
  .catch((error) => {
    console.error(error);
  });

export const rateMovie = async (imdbId, rate) => {
  await update(ref(database, `movies/${imdbId}`), { rate });
};

export const checkMovie = async (imdbId, watched) => {
  await update(ref(database, `movies/${imdbId}`), { watched });
};

export const addMovie = async (data) => {
  const imdbId = data?.movie?.imdb.match(/tt\d+/)?.[0];
  if (!imdbId) throw new Error("IMDb ID inválido");

  await set(ref(database, `movies/${imdbId}`), {
    ...data,
    watched: data.watched ?? false,
    rate: data.rate ?? 0,
  });
};

export function deleteMovie(imdbId) {
  remove(ref(database, "movies/" + imdbId));
}
