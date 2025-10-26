import React, { useContext, useState, useEffect } from "react";
import { MdOutlineSort } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NotesContext } from "../contexts/NotesContext";

function Header() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const {
    search,
    setSearch,
    sortNewestDate,
    sortOldestDate,
    sortTitleAscend,
    sortTitleDescend,
    noteList,
    setNoteList,
    setSearchResult,
  } = useContext(NotesContext);

  // search filter
  useEffect(() => {
    const filteredList = noteList.filter(
      (note) =>
        note.title.toLowerCase().includes(search?.toLowerCase().trim()) ||
        note.body.toLowerCase().includes(search?.toLowerCase().trim())
    );
    setSearchResult(filteredList);
  }, [search, noteList, setSearchResult]);

  return (
    <header className="header">
      {/* Search box */}
      <div className="form">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search" className="search-label">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {/* Sort icon */}
      <div className="header-sort" onClick={toggleMenu}>
        <MdOutlineSort className="sort-icon" />
      </div>

      {/* Backdrop overlay */}
      {open && <div className="backdrop" onClick={toggleMenu} />}

      {/* Slide-in menu */}
      <div className={`sort-menu ${open ? "open" : ""}`}>
        <FaArrowLeftLong onClick={toggleMenu} />
        <h3>Sort Options</h3>
        <ul>
          <li
            onClick={() => {
              setNoteList(sortNewestDate(noteList));
              toggleMenu();
            }}
          >
            Newest First
          </li>
          <li
            onClick={() => {
              setNoteList(sortOldestDate(noteList));
              toggleMenu();
            }}
          >
            Oldest First
          </li>
          <li
            onClick={() => {
              setNoteList(sortTitleAscend(noteList));
              toggleMenu();
            }}
          >
            Title A–Z
          </li>
          <li
            onClick={() => {
              setNoteList(sortTitleDescend(noteList));
              toggleMenu();
            }}
          >
            Title Z–A
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;

/* import React from "react";
import { RiSettingsLine } from "react-icons/ri";
import { BiFilterAlt } from "react-icons/bi";

// look at my header. How do i include the code you just gave me now?

function Header({ search, setSearch, handleSort }) {
  return (
    <header className="header">
      <div className="form">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
      <div className="header-setting">
        <RiSettingsLine className="setting-icon" />
      </div>
      <div className="header-sort" onClick={handleSort}>
        <BiFilterAlt className="sort-icon" />
      </div>
    </header>
  );
}

export default Header; */
