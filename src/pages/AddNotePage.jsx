import React, { useContext } from "react";
import { MdDoneOutline } from "react-icons/md";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../contexts/NotesContext";
import api from "../api/NotesData";
import Swal from "sweetalert2";
import { showAlert } from "../utilities/Alert";

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

  const addNote = async () => {
    if (!navigator.onLine)
      return showAlert({
        icon: "warning",
        title: "offline",
        text: "Please connect to the Internet before saving.",
      });

    try {
      const newNoteObj = buildNote();
      const response = await api.post("/notes", newNoteObj);
      const updatedNotes = [...noteList, response.data].reverse();
      setNoteList(updatedNotes);
      clearFieldsAndRedirect();
      showAlert({
        html: "Note added",
        timer: 500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } catch (err) {
      logError(err);
      showAlert({
        icon: "error",
        title: "Oops",
        text: err.message || "Something went wrong",
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
