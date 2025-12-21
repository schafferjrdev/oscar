import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import { database, checkMovie, rateMovie, deleteMovie } from "../db/firebase";
import {
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
import Header from "./Header";
import Card from "./Card";
import Drawer from "./Drawer";
import Modal from "./Modal";
import Settings from "./Settings";
import { sparkles } from "../utils/functions";

function Home() {
  const [movies, setMovies] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

useEffect(() => {
  const moviesRef = ref(database, "movies");

  const unsubAdd = onChildAdded(moviesRef, (snap) => {
    const incoming = { id: snap.key, ...snap.val() };

    setMovies((prev) => {
      // ✅ evita duplicar em hot reload/reconexão
      if (prev.some((m) => m.id === incoming.id)) return prev;
      return [...prev, incoming];
    });
  });

  const unsubChange = onChildChanged(moviesRef, (snap) => {
    const incoming = { id: snap.key, ...snap.val() };

    setMovies((prev) =>
      prev.map((m) => (m.id === incoming.id ? { ...m, ...incoming } : m))
    );
  });

  const unsubRemove = onChildRemoved(moviesRef, (snap) => {
    const id = snap.key;
    setMovies((prev) => prev.filter((m) => m.id !== id));
  });

  return () => {
    unsubAdd();
    unsubChange();
    unsubRemove();
  };
}, []);

  const handleCheck = useCallback((id, val) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, watched: val } : m))
    );
    checkMovie(id,val);
  }, []);

  const handleRate = useCallback((id, val, refElId) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === id ? { ...m, rate: val } : m))
    );
    if (val === 5) {
      const e = document.querySelector(`#${refElId}`);
      sparkles(e);
    }
    rateMovie(id, val);
  }, []);

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

  const ctxMenuClick = async (id, e) => {
    if (e.key === "delete") {
      console.log(`Deleting...`, id);
      await deleteMovie(id);
    } else {
      console.log(`outro...`, id);
    }
  };

  console.log(movies)
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
        {movies.filter(Boolean).map((movie, index) => (
          <Card
            showDrawer={showDrawer}
            data={movie}
            index={index}
            key={movie?.id}
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
