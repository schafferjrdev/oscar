import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import { database, checkMovie, rateMovie, deleteMovie } from "../db/firebase";
import { ref, onValue } from "firebase/database";
import Header from "./Header";
import Card from "./Card";
import Drawer from "./Drawer";
import Modal from "./Modal";
import Settings from "./Settings";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import { sparkles } from "../utils/functions";

function Home() {
  const [movies, setMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const moviesRef = ref(database, "movies");

    onValue(
      moviesRef,
      (snapshot) => {
        const data = snapshot.val();
        setMovies(data);
      },
      {
        onlyOnce: true,
      }
    );
    // eslint-disable-next-line
  }, []);

  const handleRate = (index, val, ref) => {
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].rate = val;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...newState]));
      return newState;
    });
    if (val === 5) {
      const e = document.querySelector(`#${ref}`);
      sparkles(e);
    }
    rateMovie(val, index);
  };

  const handleCheck = (index, val) => {
    setMovies((prevState) => {
      const newState = [...prevState];
      newState[index].watched = val;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...newState]));
      return newState;
    });
    checkMovie(val, index);
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

  const handleDarkMode = (val) => {
    setDarkMode(val);
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode", val);

    localStorage.setItem("dark-mode", val);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setselectedMovie] = useState({
    index: null,
    data: {},
    tmdb: {},
    omdb: {},
  });

  const showModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const showDrawer = (information) => {
    console.info("[Opening the drawer...]", information);
    setselectedMovie(information);
    setDrawerOpen(true);
  };

  const onClose = () => {
    navigate("/");
    setselectedMovie({
      index: null,
      data: {},
      tmdb: {},
      omdb: {},
    });
    setDrawerOpen(false);
  };

  const [settingsOpen, setSettingsOpen] = useState(false);

  const onSettingsClose = () => setSettingsOpen(false);

  const [search, setSearch] = useState("");

  const handleFocus = () => {
    setSearch("");
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  };

  useEffect(() => {
    if (!id) {
      onClose();
    }
    // eslint-disable-next-line
  }, [id]);

  const ctxMenuClick = async (index, e) => {
    if (e.key === "delete") {
      console.log(`Deleting...`, index);
      await deleteMovie(index);
      setMovies((prevState) => {
        const newState = [...prevState];
        newState.splice(index, 1);
        return newState;
      });
    } else {
      console.log(`outro...`, index);
    }
  };

  return (
    <div className='oscar-body'>
      <Header
        movies={movies}
        openSettings={setSettingsOpen}
        handleSearch={handleSearch}
        handleFocus={handleFocus}
        showModal={showModal}
        search={search}
      />
      <div className='movie-list'>
        {movies.map((movie, index) => (
          <Card
            showDrawer={showDrawer}
            data={movie}
            index={index}
            key={`movies_${index}`}
            handleCheck={handleCheck}
            handleCtx={ctxMenuClick}
            search={search}
          />
        ))}
      </div>
      <Drawer
        info={selectedMovie}
        open={drawerOpen}
        onClose={onClose}
        handleRate={handleRate}
        handleCheck={handleCheck}
      />
      <Modal
        info={selectedMovie}
        open={modalOpen}
        onClose={closeModal}
        handleAdd={handleRate}
        movies={movies}
        setMovies={setMovies}
      />
      <Settings
        open={settingsOpen}
        onClose={onSettingsClose}
        darkMode={darkMode}
        handleDarkMode={handleDarkMode}
        info={movies}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path='/:id' element={<Home />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
