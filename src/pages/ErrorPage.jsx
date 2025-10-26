import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="err-page" style={{ color: "#f6f6f6dd" }}>
      <h2>Page Not Found</h2>
      <Link to={"/"} style={{ color: "#f6f6f6dd" }}>
        <p>Go to Home</p>
      </Link>
    </section>
  );
}

export default ErrorPage;
