import React, { useContext } from "react";
import { MdStickyNote2, MdLibraryAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { NotesContext } from "../contexts/NotesContext";

function Footer() {
  const { noteList } = useContext(NotesContext);

  return (
    <footer className="footer" role="navigation">
      <section className="icons">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MdStickyNote2 />
          <div className={noteList.length ? "notes-length" : "d-none"}>
            {noteList.length}
          </div>
        </NavLink>
      </section>

      <section className="icons">
        <NavLink
          to={"/addNote"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MdLibraryAdd />
        </NavLink>
      </section>
    </footer>
  );
}

export default Footer;
