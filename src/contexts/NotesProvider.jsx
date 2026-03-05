import React, { useState, useEffect } from "react";
import { NotesContext } from "./NotesContext";
import { format } from "date-fns";

// localStorage helpers
const getStoredNotes = () => JSON.parse(localStorage.getItem("notes") || "[]");
const saveNotes = (notes) =>
  localStorage.setItem("notes", JSON.stringify(notes));

function NotesProvider({ children }) {
  const [noteList, setNoteList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteBody, setNewNoteBody] = useState("");

  // Replaces: isLoading, fetchError, refetch from useAxiosFetch
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // All 4 Sorting Functions
  const sortTitleAscend = (data) =>
    [...data].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    );

  const sortTitleDescend = (data) =>
    [...data].sort((a, b) =>
      b.title.localeCompare(a.title, undefined, { sensitivity: "base" }),
    );

  const sortOldestDate = (dateObj) =>
    [...dateObj].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  const sortNewestDate = (dateObj) =>
    [...dateObj].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  // Replaces: useAxiosFetch + useEffect([data]) — load notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = getStoredNotes();
      setNoteList(sortNewestDate(stored));
    } catch (err) {
      setFetchError("Failed to load notes from storage.");
      logError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync noteList to localStorage whenever it changes (replaces API PUT/POST/DELETE calls)
  useEffect(() => {
    if (!isLoading) {
      saveNotes(noteList);
    }
  }, [isLoading, noteList]);

  // search filter
  useEffect(() => {
    const lowerSearch = search?.toLowerCase().trim();
    const filteredList = noteList.filter(
      (note) =>
        note.title?.toLowerCase().includes(lowerSearch) ||
        note.body?.toLowerCase().includes(lowerSearch),
    );
    setSearchResult(filteredList);
  }, [search, noteList]);

  const getCurrentTime = (curDate) => {
    const formatDateTime = format(curDate, "dd/MM/yy, pp");
    return formatDateTime;
  };

  // builds a new note object with a unique ID, current datetime, and formatted display date
  const buildNote = () => {
    const currentDate = new Date();
    const formatDateTime = getCurrentTime(currentDate);

    const newNoteObj = {
      id: crypto.randomUUID(),
      datetime: currentDate.toISOString(),
      displayDate: formatDateTime,
      title: newNoteTitle.trim(),
      body: newNoteBody.trim(),
    };

    return newNoteObj;
  };

  const refetch = () => {
    const stored = getStoredNotes();
    setNoteList(sortNewestDate(stored));
  };

  const logError = (err) => {
    console.log(`Error details: ${err}`);
  };

  return (
    <NotesContext.Provider
      value={{
        noteList,
        setNoteList,
        search,
        setSearch,
        searchResult,
        setSearchResult,
        sortNewestDate,
        sortOldestDate,
        sortTitleAscend,
        sortTitleDescend,
        getCurrentTime,
        buildNote,
        newNoteTitle,
        setNewNoteTitle,
        newNoteBody,
        setNewNoteBody,
        isLoading,
        setIsLoading,
        fetchError,
        refetch,
        logError,
        saveNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
