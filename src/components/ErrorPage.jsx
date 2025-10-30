import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="err-page">
      <h2>Page Not Found</h2>
      <Link to={"/"}>
        <p>Go to Home</p>
      </Link>
    </section>
  );
}

export default ErrorPage;
