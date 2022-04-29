import React, { useState, useEffect } from "react";
import styles from './Sidebar.module.css';
import { Link } from "react-router-dom";
// import { Link } from "react-router";

function Sidebar() {
  const [sidebarActive, setSidebarActive] = useState(false);
  return(
    <React.Fragment>
    <nav
          id="sidebar"
          className={sidebarActive ? "active bg-custom" : "bg-custom"}
        >
          <div className="sidebar-header">
            <h3>Device manager</h3>
          </div>

          <ul className="list-unstyled components">
            <li className="active dropdown">
              <Link to="/dashboard">Dashboard</Link>
              {/* <a
               href="/dashboard"
               onClick={(e)=>e.preventDefault()}
              > */}
              {/* <Link to={"/dashboard"} >Dashboard</Link> */}
                
              {/* </a> */}
              {/* <ul className="collapse list-unstyled" id="deviceSubmenu">
                <li>
                  <a href="#">Peripheral</a>
                </li>
                <li>
                  <a href="#">Gateway</a>
                </li>
              </ul> */}
            </li>
            <li className="dropdown">
              <a
                data-bs-toggle="collapse"
                data-bs-target="#peripheralSubmenu"
                aria-expanded="true"
                className="dropdown-toggle"
              >
                Peripheral mangement
              </a>
              <ul className="collapse list-unstyled" id="peripheralSubmenu">
                <li>
                {/* <Link to="/peripheral">Peripheral List</Link> */}
                  <Link to={"/peripheral"}>List</Link>
                </li>
                <li>
                  <Link to={"/peripheral/form"}>Add</Link>
                </li>
              </ul>
            </li>
            <li className="dropdown">
              <a
                data-bs-toggle="collapse"
                data-bs-target="#gatewaySubmenu"
                aria-expanded="true"
                className="dropdown-toggle"
              >
                Gateway mangement
              </a>
              <ul className="collapse list-unstyled" id="gatewaySubmenu">
                <li>
                {/* <Link to="/gateway">Gateway List</Link> */}
                <Link to={"/gateway"}>List</Link>
                </li>
                <li>
                  <Link to={"/gateway/form"}>Add</Link>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
    </React.Fragment>
  )
}

export default Sidebar;
