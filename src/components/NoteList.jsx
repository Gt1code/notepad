import React, { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteItem from "./NoteItem";

function NoteList() {
  const { noteList, search, searchResult } = useContext(NotesContext);

  const displayList = search ? searchResult : noteList;

  return (
    <main className="note-list">
      <ul>
        {displayList.map((list) => (
          <NoteItem key={list.id} list={list} />
        ))}
      </ul>

      {!displayList.length && (
        <div className="no-match">
          <h2>Notes are empty</h2>
        </div>
      )}
    </main>
  );
}

export default NoteList;
