import React from "react";
import { Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import AddNotePage from "./pages/AddNotePage";
import EachNote from "./pages/EachNote";
import EditPage from "./pages/EditPage";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NotesPage />} />
        <Route path="/addNote" element={<AddNotePage />} />
        <Route path="/notes/:noteId" element={<EachNote />} />
        <Route path="/edit/:editId" element={<EditPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
