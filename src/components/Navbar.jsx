// src/components/Navbar.jsx
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-brand">Aycan Gelen</div>

      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-links ${open ? "nav-links-open" : ""}`}>
        <a href="#about" onClick={() => setOpen(false)}>About</a>
        <a href="#education" onClick={() => setOpen(false)}>Education</a>
        <a href="#experience" onClick={() => setOpen(false)}>Experience</a>
        <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
        <a href="#references" onClick={() => setOpen(false)}>References</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
      </nav>
    </header>
  );
}

export default Navbar;
