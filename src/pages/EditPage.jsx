import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdDoneOutline } from "react-icons/md";
import Footer from "../components/Footer";
import { format } from "date-fns";
import api from "../api/NotesData";
import Swal from "sweetalert2";

function EditPage() {
  const navigate = useNavigate();
  const { noteList, setNoteList } = useContext(NotesContext);
  const { editId } = useParams();
  const myEdit = noteList.find((edit) => edit.id.toString() === editId);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    if (myEdit) {
      setEditTitle(myEdit.title);
      setEditBody(myEdit.body);
    }
  }, [myEdit, setEditTitle, setEditBody]);

  const handleEdit = async (id) => {
    const currentTime = new Date();

    const updatedPost = {
      id: id.toString(),
      title: editTitle.trim(),
      datetime: currentTime.toISOString(),
      displayDate: format(currentTime, "dd/MM/yy, pp"),
      body: editBody.trim(),
    };

    try {
      const response = await api.put(`/notes/${id}`, updatedPost);
      setNoteList(
        noteList.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  const saveChangesPopUp = async (id) => {
    Swal.fire({
      theme: "auto",
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleEdit(id);
        Swal.fire({
          theme: "auto",
          html: "Changes saved!",
          timer: 500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
      } else if (result.isDenied) {
        Swal.fire({
          theme: "auto",
          text: "Changes are not saved",
        });
      }
    });
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "700px",
        minHeight: "100vh",
      }}
    >
      {myEdit && (
        <main className="addNote-page">
          <header className="addNote-header">
            <FaArrowLeftLong onClick={() => navigate(`/notes/${myEdit.id}`)} />
            <h2>Edit Note</h2>
            <div className="done-icon-container">
              <MdDoneOutline
                className="done-icon"
                onClick={() => saveChangesPopUp(myEdit.id)}
              />
            </div>
          </header>

          <form className="newNoteForm" onSubmit={(e) => e.preventDefault()}>
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

          <Footer />
        </main>
      )}
    </div>
  );
}

export default EditPage;
