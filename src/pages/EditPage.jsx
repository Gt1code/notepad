import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDoneOutline } from "react-icons/md";
import { showAlert } from "../utilities/Alert";
import ErrorPage from "../components/ErrorPage";
import { toast } from "sonner";

function EditPage() {
  const navigate = useNavigate();
  const { noteList, setNoteList, sortNewestDate, getCurrentTime } =
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

  // handle edit
  const handleEdit = (id) => {
    if (!editTitle.trim() && !editBody.trim()) {
      toast.error("Title and body cannot be empty", { position: "top-right" });
      return;
    }

    const currentTime = new Date();
    const updatedNote = {
      id,
      datetime: currentTime.toISOString(),
      displayDate: getCurrentTime(currentTime),
      title: editTitle.trim(),
      body: editBody.trim(),
    };

    const updatedList = sortNewestDate(
      noteList.map((note) => (note.id === id ? updatedNote : note)),
    );

    setNoteList(updatedList);
    toast.success("Note updated", { position: "top-right", duration: 1000 });
    clearFieldsAndRedirect();
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
            placeholder="Edit Title"
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
            placeholder="Edit Body"
          />
        </form>
      </main>
    </div>
  );
}
export default EditPage;
