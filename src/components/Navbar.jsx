import { useState } from "react";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <a className="brand" href="#about" aria-label="Aycan Gelen home">
          ag<span>.</span>
        </a>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? "Close ×" : "Menu ☰"}
        </button>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={open ? "nav-links open" : "nav-links"}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {["Experience", "Projects", "Skills", "Education", "Contact"].map(
            (label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ),
          )}
        </nav>
        <a className="nav-contact" href="mailto:gelenaycan@gmail.com">
          Let’s talk ↗
        </a>
      </div>
    </header>
  );
}
