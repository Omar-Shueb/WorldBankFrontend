import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "./logo.png";

class NavBar extends React.Component {
  render() {
    return (
      <div className="header">
        <img className="logo" alt="world bank logo" src={logo}></img>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/search">
                  <button className="search-btn">Search</button>
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link className="history" to="/history">
                  <button className="history-btn">History</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout">
                  <button>Log out</button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
