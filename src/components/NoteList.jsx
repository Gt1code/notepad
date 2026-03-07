import React, { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteItem from "./NoteItem";

function NoteList() {
  const { noteList, search, searchResult } = useContext(NotesContext);

  const displayList = search ? searchResult : noteList;

  return (
    <main className="note-list">
      {displayList.length ? (
        <ul>
          {displayList.map((list) => (
            <NoteItem key={list.id} list={list} />
          ))}
        </ul>
      ) : (
        <div className="no-match">
          {search ? "No matching notes found." : "No available notes."}
        </div>
      )}
    </main>
  );
}

export default NoteList;
