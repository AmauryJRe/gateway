import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand sticky-top navbar-dark bg-custom px-2">
        <Link to={"/dashboard"} className="navbar-brand">
          Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-target="gateway_admin"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gateway
              </a>
              <ul className="dropdown-menu" id="gateway_admin">
                <li>
                  <Link to={"/gateway"} className="dropdown-item">
                    List
                  </Link>
                </li>
                <li>
                  <Link to={"/gateway/form"} className="dropdown-item">
                    Create
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-target="peripheral_admin"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Peripheral
              </a>
              <ul className="dropdown-menu" id="peripheral_admin">
                <li>
                  <Link to={"/peripheral"} className="dropdown-item">
                    List
                  </Link>
                </li>
                <li>
                  <Link to={"/peripheral/form"} className="dropdown-item">
                    Create
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;
