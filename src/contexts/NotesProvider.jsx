import React, { useState, useEffect } from "react";
import { NotesContext } from "./NotesContext";
import api from "../api/NotesData";
import { format } from "date-fns";
import useAxiosFetch from "../hooks/useAxiosFetch";

function NotesProvider({ children }) {
  // Note List default hardcoded state
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

  // error handling
  const handleError = (err) => {
    if (err.response) {
      console.log(
        "API Error:",
        err.response.data,
        err.response.status,
        err.response.headers
      );
    } else {
      console.log(`Error: ${err.stack}`);
    }
  };

  const { data, fetchError, isLoading, refetch } = useAxiosFetch(
    "https://notepad-c972.onrender.com/notes"
  );

  useEffect(() => {
    setNoteList(data);
  }, [data]);

  // search filter
  useEffect(() => {
    const filteredList = noteList.filter(
      (note) =>
        note.title?.toLowerCase().includes(search?.toLowerCase().trim()) ||
        note.body?.toLowerCase().includes(search?.toLowerCase().trim())
    );
    setSearchResult(filteredList);
  }, [search, noteList]);

  // handleDelete function
  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id.toString()}`);
      const filteredList = noteList.filter((note) => note.id !== id);
      setNoteList(filteredList);
    } catch (err) {
      handleError(err);
    }
  };

  const getCurrentTime = (curDate) => {
    const formatDateTime = format(curDate, "dd/MM/yy, pp");
    return formatDateTime;
  };

  const buildNote = () => {
    const orderOfId = noteList.sort((a, b) => a.id - b.id);

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

  const addNote = async () => {
    try {
      const newNoteObj = buildNote();
      const response = await api.post("/notes", newNoteObj);
      const updatedNotes = [...noteList, response.data].reverse();
      setNoteList(updatedNotes);
      setNewNoteTitle("");
      setNewNoteBody("");
    } catch (err) {
      handleError(err);
    }
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
        handleDelete,
        sortNewestDate,
        sortOldestDate,
        sortTitleAscend,
        sortTitleDescend,
        getCurrentTime,
        handleError,
        buildNote,
        newNoteTitle,
        setNewNoteTitle,
        newNoteBody,
        setNewNoteBody,
        addNote,
        isLoading,
        fetchError,
        refetch,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export default NotesProvider;
