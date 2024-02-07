import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import "./App.scss";
import Header from "./Header";
import Card from "./Card";
import Drawer from "./Drawer";
import { LOCAL_STORAGE_KEY } from "./constants";

function App() {
  const [movies, setMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const moviesRef = ref(database, "movies");

    onValue(
      moviesRef,
      (snapshot) => {
        const data = snapshot.val();

        const storage = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storage) {
          console.log("has oscar local data, loading...");
          const parsed = JSON.parse(storage);
          setMovies(
            data.map((d, i) => ({
              ...d,
              rate: parsed[i]?.rate,
              watched: parsed[i]?.watched,
            }))
          );
        } else {
          console.log("no local data found, loading from server...");
          setMovies(
            data.map((d, i) => ({
              ...d,
              rate: 0,
              watched: false,
            }))
          );
        }
      },
      {
        onlyOnce: true,
      }
    );
    // eslint-disable-next-line
  }, []);

  const handleRate = (index, val) => {
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].rate = val;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const handleCheck = (index) => {
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].watched = !newState[index].watched;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    const dark = localStorage.getItem("dark-mode");
    const body = document.querySelector("body");
    if (dark === "true") {
      setDarkMode(dark === "true");
      body.classList.add("dark-mode");
    }
    // eslint-disable-next-line
  }, []);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode", !darkMode);

    localStorage.setItem("dark-mode", !darkMode);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMovie, setselectedMovie] = useState({
    index: null,
    data: {},
    tmdb: {},
    omdb: {},
  });

  const showDrawer = (information) => {
    console.log("info", information);
    setselectedMovie(information);
    setDrawerOpen(true);
  };

  const onClose = () => {
    setselectedMovie({
      index: null,
      data: {},
      tmdb: {},
      omdb: {},
    });
    setDrawerOpen(false);
  };

  return (
    <div className='oscar-body'>
      <Header
        movies={movies}
        darkMode={darkMode}
        handleDarkMode={handleDarkMode}
      />
      <div className='movie-list'>
        {movies.map((movie, index) => (
          <Card
            showDrawer={showDrawer}
            data={movie}
            index={index}
            key={`movies_${index}`}
          />
        ))}
      </div>
      <Drawer
        open={drawerOpen}
        info={selectedMovie}
        onClose={onClose}
        handleRate={handleRate}
        handleCheck={handleCheck}
      />
    </div>
  );
}

export default App;
