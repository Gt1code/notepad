import React from "react";
import { Link } from "react-router-dom";

function NoteItem({ list }) {
  return (
    <Link
      className="link-style"
      to={`/notes/${list.id}`}
      style={{
        flex: "1",
        cursor: "auto",
      }}
    >
      <li className="note-box">
        <p className="date" style={{ fontSize: "0.95rem" }}>
          {list.displayDate}
        </p>

        <div className="note-header">
          <h3>{list.title ? list.title : "..."}</h3>
        </div>

        <p>{list.body ? list.body : "..."}</p>
      </li>
    </Link>
  );
}

export default NoteItem;
