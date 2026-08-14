import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${menuOpen ? "navbar-menu-open" : ""}`}>
      <a className="navbar-logo" href="#" onClick={closeMenu}>
        YUG
      </a>

      <nav className="navbar-links">
        <a href="#about">ABOUT</a>
        <a href="#work">WORK</a>
        <a href="#skills">SKILLS</a>
        <a href="#contact">CONTACT</a>
      </nav>

      <button
        className="navbar-menu-button"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div className={`navbar-mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <a href="#about" onClick={closeMenu}>
          ABOUT
        </a>

        <a href="#work" onClick={closeMenu}>
          WORK
        </a>

        <a href="#skills" onClick={closeMenu}>
          SKILLS
        </a>

        <a href="#contact" onClick={closeMenu}>
          CONTACT
        </a>
      </div>
    </header>
  );
}

export default Navbar;