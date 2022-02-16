import React from "react";
import Networking from "../Networking";

import NavBar from "../NavBar/NavBar";
// import "./App.css";

class HistoryPage extends React.Component {
  networking = new Networking();

  componentDidMount() {
    this.getHistoryComponents();
  }

  async getHistoryComponents() {
    const userHistory = await this.networking.getUserHistory();
    console.log(userHistory);
  }
  render() {
    return (
      <div>
        <NavBar className="navbar" />
      </div>
    );
  }
}

export default HistoryPage;
