import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "./logo.png";
import Networking from "../Networking";

class NavBar extends React.Component {
  networking = new Networking();

  handleLogout = async () => {
    await this.networking.patchSession();
    await this.props.checkLogin();
  };

  render() {
    return (
      <div className="header">
        {/* <img className="logo" alt="world bank logo" src={logo}></img> */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li>
                <img className="logo" alt="world bank logo" src={logo}></img>
              </li>
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
                <button onClick={this.handleLogout}>Log out</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
