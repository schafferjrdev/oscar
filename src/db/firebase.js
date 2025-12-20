// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, remove } from "firebase/database";
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

export function checkMovie(data, index) {
  set(ref(database, "movies/" + index + "/watched"), data);
}

export function rateMovie(data, index) {
  set(ref(database, "movies/" + index + "/rate"), data);
}

export function addMovie(data, length) {
  set(ref(database, "movies/" + length + "/"), data);
}

export function deleteMovie(index) {
  remove(ref(database, "movies/" + index));
}
