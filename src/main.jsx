import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NotesProvider from "./contexts/NotesProvider.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotesProvider>
      <Router>
        {/* <Routes>
          <Route path="/*" element={<App />} />
        </Routes> */}
        <App />
      </Router>
    </NotesProvider>
  </StrictMode>
);
