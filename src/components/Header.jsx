import React, { useContext, useState, useEffect } from "react";
import { MdOutlineSort } from "react-icons/md";
import { NotesContext } from "../contexts/NotesContext";
import MobileMenu from "./MobileMenu";

function Header() {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const { search, setSearch, noteList, setSearchResult } =
    useContext(NotesContext);

  // search filter
  useEffect(() => {
    const filteredList = noteList.filter(
      (note) =>
        note.title.toLowerCase().includes(search?.toLowerCase().trim()) ||
        note.body.toLowerCase().includes(search?.toLowerCase().trim()),
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
      <div className="header-sort">
        <MdOutlineSort className="sort-icon" onClick={toggleMenu} />
      </div>

      {/* Backdrop overlay */}
      {open && <div className="backdrop" onClick={toggleMenu} />}

      {/* Slide-in menu */}
      <MobileMenu open={open} toggleMenu={toggleMenu} />
    </header>
  );
}

export default Header;
