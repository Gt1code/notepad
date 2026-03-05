import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NotesContext } from "../contexts/NotesContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { showAlert } from "@/utilities/Alert";
import ErrorPage from "../components/ErrorPage";

function EachNote() {
  const navigate = useNavigate();
  const { noteList, setNoteList, logError } = useContext(NotesContext);
  const { noteId } = useParams();

  const note = noteList.find((note) => note.id.toString() === noteId);

  // handleDelete function
  const handleDelete = (id) => {
    try {
      const filteredList = noteList.filter((note) => note.id !== id);
      setNoteList(filteredList);

      toast.success("Note deleted", {
        position: "top-right",
        duration: 1000,
      });
      navigate("/");
    } catch (err) {
      logError(err);
      toast.error("Failed to delete note", {
        position: "top-right",
        duration: 1000,
      });
    }
  };

  const deletePopUp = (id) => {
    showAlert({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  if (!note) return <ErrorPage />;

  return (
    <main className="each-note">
      <article className="eachNote-article">
        <header className="each-note-header d-flex">
          <section className="left-arrow">
            <FaArrowLeftLong onClick={() => navigate("/")} />
          </section>

          <section className="right-section d-flex">
            <div className="icon-wrap">
              <Link className="link-style" to={`/edit/${note.id}`}>
                <div className="edit-svg">
                  <MdOutlineEdit />
                </div>
              </Link>
              <p className="fs-09">Edit</p>
            </div>

            <div className="icon-wrap">
              <div
                className="delete-svg"
                onClick={() => {
                  deletePopUp(note.id);
                }}
              >
                <RiDeleteBin6Line />
              </div>
              <p className="fs-09">Delete</p>
            </div>
          </section>
        </header>

        <div className="sticky">
          <p className="fs-09">Date added || {note.displayDate}</p>

          <h2>{note.title}</h2>
        </div>
        <hr />
        <p className="overflow-body flex-1">{note.body}</p>
      </article>
    </main>
  );
}

export default EachNote;
