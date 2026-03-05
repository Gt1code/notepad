import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDoneOutline } from "react-icons/md";
import { showAlert } from "../utilities/Alert";
import ErrorPage from "../components/ErrorPage";
import { toast } from "sonner";

const currentDate = new Date();

function EditPage() {
  const navigate = useNavigate();
  const { noteList, setNoteList, sortNewestDate, logError, getCurrentTime } =
    useContext(NotesContext);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const { editId } = useParams();
  const myEdit = noteList.find((edit) => edit.id.toString() === editId);

  useEffect(() => {
    if (myEdit) {
      setEditTitle(myEdit.title);
      setEditBody(myEdit.body);
    }
  }, [myEdit]);

  const clearFieldsAndRedirect = () => {
    setEditTitle("");
    setEditBody("");
    navigate("/");
  };

  const buildUpdatedNote = (title, body, time) => ({
    id: crypto.randomUUID(),
    datetime: time.toISOString(),
    displayDate: getCurrentTime(currentDate),
    title: title.trim(),
    body: body.trim(),
  });

  // handleEdit function
  const handleEdit = (id) => {
    const currentTime = new Date();
    const updatedPost = buildUpdatedNote(editTitle, editBody, currentTime);

    try {
      const getStored = JSON.parse(localStorage.getItem("noteList")) || [];
      const updatedList = getStored.map((note) =>
        note.id === id ? { ...updatedPost } : note,
      );
      localStorage.setItem("noteList", JSON.stringify(updatedList));
      setNoteList(
        sortNewestDate(
          noteList.map((post) => (post.id === id ? { ...updatedPost } : post)),
        ),
      );
      toast.success("Note updated", {
        position: "top-right",
        duration: 1000,
      });
      clearFieldsAndRedirect();
    } catch (err) {
      logError(err);
      toast.error("Failed to update note", {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  const saveChangesPopUp = (id) => {
    showAlert({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleEdit(id);
      } else if (result.isDenied) {
        showAlert({ text: "Changes are not saved" });
      }
    });
  };

  if (!myEdit) {
    return <ErrorPage />;
  }

  return (
    <div className="edit-page-wrapper">
      <main className="addNote-page">
        <header className="addNote-header">
          <div className="edit-left-arrow">
            <FaArrowLeftLong onClick={() => navigate(`/notes/${myEdit.id}`)} />
          </div>
          <h2>Edit Note</h2>
          <div className="done-icon-container">
            <div className="done-svg">
              <MdDoneOutline onClick={() => saveChangesPopUp(myEdit.id)} />
            </div>
          </div>
        </header>

        <form className="newNoteForm pb-8" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="noteTitle">Title</label>
          <input
            type="text"
            required
            placeholder="Title"
            id="noteTitle"
            autoFocus
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            maxLength={100}
          />

          <label htmlFor="noteBody">Body</label>
          <textarea
            id="noteBody"
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
        </form>
      </main>
    </div>
  );
}
export default EditPage;
