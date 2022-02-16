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
      history: [],
    };
  }
  networking = new Networking();

  componentDidMount() {
    this.getHistoryComponents();
  }

  async getHistoryComponents() {
    const history = await this.networking.getHistory();
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
    const [data] = this.state.history.filter((search) => {
      return search.id === parseInt(this.state.currentlySelected);
    });
    return (
      <Redirect
        to={{
          pathname: "/results",
          state: {
            country: data.country_id,
            startYear: data.year,
            endYear: data.year_end,
            indicator: data.indicator_id,
          },
        }}
      />
    );
  };

  render() {
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
