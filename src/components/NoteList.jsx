import React, { useContext } from "react";
import { NotesContext } from "../contexts/NotesContext";
import NoteItem from "./NoteItem";

function NoteList() {
  const { noteList, search, searchResult, isLoading, fetchError, refetch } =
    useContext(NotesContext);

  const displayList = search ? searchResult : noteList;

  return (
    <main className="note-list">
      {isLoading && <p>loading...</p>}

      {!isLoading && fetchError && (
        <div className="error-container">
          <p className="error">{fetchError}</p>
          <button onClick={refetch} className="retry-btn">
            Try Again
          </button>
        </div>
      )}

      {!isLoading &&
        !fetchError &&
        (displayList.length ? (
          <ul>
            {displayList.map((list) => (
              <NoteItem key={list.id} list={list} />
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: "center" }}>
            {search ? "No matching notes found." : "No available notes."}
          </p>
        ))}
    </main>
  );
}

export default NoteList;
