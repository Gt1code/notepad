import { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import { showAlert } from "@/utilities/Alert";
import { toast } from "sonner";

const MobileMenu = ({ toggleMenu, open }) => {
  const {
    sortNewestDate,
    sortOldestDate,
    sortTitleAscend,
    sortTitleDescend,
    noteList,
    setNoteList,
  } = useContext(NotesContext);

  const sortOptions = [
    { label: "Newest First", fn: sortNewestDate },
    { label: "Oldest First", fn: sortOldestDate },
    { label: "Title A–Z", fn: sortTitleAscend },
    { label: "Title Z–A", fn: sortTitleDescend },
  ];

  const handleDeleteAll = () => {
    toggleMenu();

    showAlert({
      title: "Delete all notes?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("notes");
        setNoteList([]);
        toast.success("Note Deleted", {
          position: "top-center",
          duration: 1000,
        });
      }
    });
  };

  return (
    <article className={`sort-menu ${open ? "open" : ""}`}>
      <h3>Sort Options</h3>

      <ul>
        {sortOptions.map(({ label, fn }) => (
          <li
            key={label}
            onClick={() => {
              setNoteList(fn(noteList));
              toggleMenu();
            }}
          >
            {label}
          </li>
        ))}
      </ul>

      <button className="button-destructive" onClick={handleDeleteAll}>
        Delete All Notes
      </button>
    </article>
  );
};

export default MobileMenu;
