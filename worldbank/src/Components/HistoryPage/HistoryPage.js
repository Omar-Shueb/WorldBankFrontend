import React from "react";
import Networking from "../Networking";
import HistoryTable from "./HistoryTable.js";
import NavBar from "../NavBar/NavBar";
import { Redirect } from "react-router-dom";

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelected: null,
      search: false,
      history: [
        {
          id: "1",
          country: "Angola",
          indicator: "Search",
          startYear: 1990,
          endYear: 2000,
          created_at: "2020-10-01",
        },
        {
          id: "2",
          country: "Angola",
          indicator: "Search",
          startYear: 1990,
          endYear: 2000,
          created_at: "2020-10-01",
        },
      ],
    };
  }
  networking = new Networking();

  componentDidMount() {
    this.getHistoryComponents();
  }

  async getHistoryComponents() {
    const history = await this.networking.getUserHistory();
    this.setState({ history: history });
  }

  changeSelected = (id) => {
    const newSelection = this.state.currentlySelected === id ? null : id;
    this.setState({ currentlySelected: newSelection });
  };

  updateSearch = () => {
    this.setState({ search: true });
  };

  handleRedirect = () => {
    console.log("redirecting to search");
    // return (
    // <Redirect
    //   to={{
    //     pathname: "/results",
    //     state: {
    //       country: this.state.country,
    //       startYear: this.state.startYear,
    //       indicator: this.state.indicator,
    //     },
    //   }}
    // />
    // );
  };

  render() {
    console.log(this.state.search);
    return (
      <>
        {this.state.search ? (
          this.handleRedirect()
        ) : (
          <div className="history-page">
            <NavBar className="navbar" checkLogin={this.props.checkLogin} />
            {this.state.history && (
              <HistoryTable
                history={this.state.history}
                selected={this.state.currentlySelected}
                changeSelected={this.changeSelected}
                updateSearch={this.updateSearch}
              />
            )}
          </div>
        )}
      </>
    );
  }
}

export default HistoryPage;
