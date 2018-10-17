// import React from "react";

// const Nav = () => (
//   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//     <a className="navbar-brand" href="/">
//       React Reading List
//     </a>
//   </nav>
// );

// export default Nav;

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
      <span className="score">
        Sign up
        <span className="badge badge-pill badge-secondary"> Sign up</span>
        <span className="highScore">Sign in:</span>
        <span className="badge badge-pill badge-secondary"> Sign in</span>
      </span>
    </nav>
  );
};

export default Nav;
