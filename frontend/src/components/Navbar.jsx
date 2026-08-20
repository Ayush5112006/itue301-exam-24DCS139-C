import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/books", label: "Books" },
    { to: "/borrow", label: "Borrow" },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-icon">L</div>
        LibManager
      </Link>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
