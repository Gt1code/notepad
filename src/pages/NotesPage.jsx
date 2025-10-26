import React from "react";
import Header from "../components/Header";
import NoteList from "../components/NoteList";
import Footer from "../components/Footer";

function NotesPage() {
  return (
    <article className="notes-page">
      <Header />
      <NoteList />
      <Footer />
    </article>
  );
}

export default NotesPage;
