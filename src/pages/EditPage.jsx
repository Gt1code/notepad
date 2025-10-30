import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDoneOutline } from "react-icons/md";
import { format } from "date-fns";
import api from "../api/NotesData";
import { showAlert } from "../utilities/Alert";
import ErrorPage from "../components/ErrorPage";

function EditPage() {
  const navigate = useNavigate();
  const { noteList, setNoteList, sortNewestDate, logError } =
    useContext(NotesContext);
  const { editId } = useParams();
  const myEdit = noteList.find((edit) => edit.id.toString() === editId);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

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

  const buildUpdatedNote = (id, title, body, time) => ({
    id: id.toString(),
    title: title.trim(),
    datetime: time.toISOString(),
    displayDate: format(time, "dd/MM/yy, pp"),
    body: body.trim(),
  });

  // handleEdit function
  const handleEdit = async (id) => {
    if (!navigator.onLine)
      return showAlert({
        icon: "warning",
        title: "offline",
        text: "Please connect to the Internet before saving.",
      });

    const currentTime = new Date();
    const updatedPost = buildUpdatedNote(id, editTitle, editBody, currentTime);

    try {
      const response = await api.put(`/notes/${id}`, updatedPost);
      setNoteList(
        sortNewestDate(
          noteList.map((post) => (post.id === id ? { ...response.data } : post))
        )
      );
      showAlert({
        icon: "success",
        title: "Note updated",
        text: "Your changes were saved successfully",
      });
      clearFieldsAndRedirect();
    } catch (err) {
      logError(err);
      showAlert({
        icon: "error",
        title: "Oops",
        text: err.message || "Something went wrong",
      });
    }
  };

  const saveChangesPopUp = async (id) => {
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

  if (!myEdit) return <ErrorPage />;

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
