import React, { useContext } from "react";
import { MdDoneOutline } from "react-icons/md";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../contexts/NotesContext";
import { toast } from "sonner";

function AddNotePage() {
  const navigate = useNavigate();
  const {
    newNoteTitle,
    setNewNoteTitle,
    newNoteBody,
    setNewNoteBody,
    buildNote,
    noteList,
    setNoteList,
    logError,
  } = useContext(NotesContext);

  const clearFieldsAndRedirect = () => {
    setNewNoteTitle("");
    setNewNoteBody("");
    navigate("/");
  };

  const addNote = () => {
    try {
      const newNoteObj = buildNote();
      const updatedNotes = [newNoteObj, ...noteList];
      setNoteList(updatedNotes);
      clearFieldsAndRedirect();
      toast.success("Note added", {
        position: "top-center",
        duration: 1000,
      });
    } catch (err) {
      logError(err);
      toast.error("Failed to add note", {
        position: "top-center",
        duration: 1000,
      });
    }
  };

  return (
    <main className="addNote-page">
      <header className="addNote-header">
        <h2>Add Note</h2>
        <div
          className="done-svg"
          onClick={() => {
            addNote();
          }}
        >
          <MdDoneOutline />
        </div>
      </header>

      <form className="newNoteForm pb-72" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="noteTitle">Title</label>
        <input
          type="text"
          required
          placeholder="Title"
          id="noteTitle"
          autoFocus
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          maxLength={100}
        />

        <label htmlFor="noteBody">Body</label>
        <textarea
          id="noteBody"
          required
          placeholder="Note Something Down"
          value={newNoteBody}
          onChange={(e) => setNewNoteBody(e.target.value)}
        />
      </form>

      <Footer />
    </main>
  );
}

export default AddNotePage;
