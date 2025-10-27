import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { NotesContext } from "../contexts/NotesContext";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

function EachNote() {
  const navigate = useNavigate();
  const { noteList } = useContext(NotesContext);
  const { noteId } = useParams();
  const { handleDelete } = useContext(NotesContext);

  const note = noteList.find((note) => note.id.toString() === noteId);

  const deletePopUp = async (id) => {
    Swal.fire({
      theme: "auto",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          theme: "auto",
          html: "Deleted!",
          timer: 500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        handleDelete(id);
        navigate("/");
      }
    });
  };

  return (
    <main className="each-note">
      {note && (
        <article style={{ paddingBottom: "20px", backgroundColor: "#111111" }}>
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
          <p className="overflow-body">{note.body}</p>
        </article>
      )}
    </main>
  );
}

export default EachNote;
