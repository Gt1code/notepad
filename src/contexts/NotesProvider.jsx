import React, { useState, useEffect } from "react";
import { NotesContext } from "./NotesContext";
import { format } from "date-fns";
import useAxiosFetch from "../hooks/useAxiosFetch";

function NotesProvider({ children }) {
  const [noteList, setNoteList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteBody, setNewNoteBody] = useState("");

  // All 4 Sorting Functions
  const sortTitleAscend = (data) =>
    [...data].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );

  const sortTitleDescend = (data) =>
    [...data].sort((a, b) =>
      b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
    );

  const sortOldestDate = (dateObj) =>
    [...dateObj].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  const sortNewestDate = (dateObj) =>
    [...dateObj].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  const { data, fetchError, isLoading, refetch } = useAxiosFetch(
    "https://notepad-c972.onrender.com/notes"
  );

  // fetch data on mount/reload
  useEffect(() => {
    setNoteList(sortNewestDate(data));
  }, [data]);

  // search filter
  useEffect(() => {
    const lowerSearch = search?.toLowerCase().trim();
    const filteredList = noteList.filter(
      (note) =>
        note.title?.toLowerCase().includes(lowerSearch) ||
        note.body?.toLowerCase().includes(lowerSearch)
    );
    setSearchResult(filteredList);
  }, [search, noteList]);

  const getCurrentTime = (curDate) => {
    const formatDateTime = format(curDate, "dd/MM/yy, pp");
    return formatDateTime;
  };

  const buildNote = () => {
    const orderOfId = [...noteList].sort((a, b) => a.id - b.id);

    const newId = orderOfId.length
      ? Number(orderOfId[orderOfId.length - 1].id) + 1
      : 1;

    const currentDate = new Date();
    const formatDateTime = getCurrentTime(currentDate);

    const newNoteObj = {
      id: newId.toString(),
      datetime: currentDate.toISOString(),
      displayDate: formatDateTime,
      title: newNoteTitle.trim(),
      body: newNoteBody.trim(),
    };

    return newNoteObj;
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
        fetchError,
        refetch,
        logError,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
