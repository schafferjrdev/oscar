import React, { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import { useNavigate, Routes, Route, useParams } from "react-router-dom";
import { database, checkMovie, rateMovie, deleteMovie } from "../db/firebase";
import { ref, onValue } from "firebase/database";
import Header from "./Header";
import Card from "./Card";
import Drawer from "./Drawer";
import Modal from "./Modal";
import Settings from "./Settings";
import { sparkles } from "../utils/functions";

function Home() {
  const { data: movies = [], mutate } = useSWR("movies", null, { fallbackData: [] });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

useEffect(() => {
  const moviesRef = ref(database, "movies");

  const unsub = onValue(moviesRef, (snap) => {
    const val = snap.val() || {};
    const list = Object.entries(val).map(([id, data]) => ({ id, ...data }));

    mutate(list, { revalidate: false }); // SWR vira só o store
  });

  return () => unsub();
}, [mutate]);

const handleCheck = useCallback(
  async (id, val) => {
    await mutate(
      async (current = []) => {
        // chama backend/firebase
        await checkMovie(id, val);
        return current.map((m) => (m.id === id ? { ...m, watched: val } : m));
      },
      {
        optimisticData: (current = []) =>
          current.map((m) => (m.id === id ? { ...m, watched: val } : m)),
        rollbackOnError: true,
        revalidate: false, // como você já tem realtime, não precisa "refetch"
      }
    );
  },
  [mutate]
);

const handleRate = useCallback(
  async (id, val, refElId) => {
    if (val === 5) {
      const e = document.querySelector(`#${refElId}`);
      sparkles(e);
    }

    await mutate(
      async (current = []) => {
        await rateMovie(id, val);
        return current.map((m) => (m.id === id ? { ...m, rate: val } : m));
      },
      {
        optimisticData: (current = []) =>
          current.map((m) => (m.id === id ? { ...m, rate: val } : m)),
        rollbackOnError: true,
        revalidate: false,
      }
    );
  },
  [mutate]
);

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
