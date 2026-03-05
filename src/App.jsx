import React from "react";
import { Routes, Route } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import AddNotePage from "./pages/AddNotePage";
import EachNote from "./pages/EachNote";
import EditPage from "./pages/EditPage";
import ErrorPage from "./components/ErrorPage";
import { Toaster } from "@/components/ui/sonner";

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

      <Toaster
        richColors
        toastOptions={{
          classNames: {
            error: "bg-red-500 text-white",
            success: "bg-green-500 text-white",
            warning: "bg-yellow-500 text-black",
            info: "bg-blue-500 text-white",
          },
        }}
      />
    </div>
  );
};

export default App;
