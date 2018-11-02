import React from "react";
import "./nav.css";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-md fixed-top justify-content-center">
        <h2 className="header">
            <a className="brand" href="/">
            Grill on the Go!
            </a>
        </h2>
        <h2>
            <span className="badge badge-pill badge-secondary sign-in-up"><a className="nav-link" href='/signup'> Sign up</a></span>
            <span className="badge badge-pill badge-secondary sign-in-up"><a className="nav-link" href="/"> Sign in</a></span>
        </h2>
    </nav>
  );
};

export default Nav;
