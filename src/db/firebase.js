// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8MxJLIJmecEUcCE-LjXDDx2PHgknlS2Y",
  authDomain: "oscar-1c820.firebaseapp.com",
  databaseURL: "https://oscar-1c820-default-rtdb.firebaseio.com",
  projectId: "oscar-1c820",
  storageBucket: "oscar-1c820.appspot.com",
  messagingSenderId: "497703726051",
  appId: "1:497703726051:web:a3be8592ff5af5ee190ed6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const database = getDatabase(app);

export function checkMovie(data, index) {
  set(ref(database, "movies/" + index + "/watched"), data);
}

export function rateMovie(data, index) {
  set(ref(database, "movies/" + index + "/rate"), data);
}
