import React from "react";
import Networking from "../Networking";
import HistoryTable from "./HistoryTable.js";
import NavBar from "../NavBar/NavBar";
import { Redirect } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme.js";

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlySelected: null,
      search: false,
      history: [],
      isAdmin: false,
    };
  }
  networking = new Networking();

  componentDidMount() {
    this.getHistoryComponents();
  }

  async getHistoryComponents() {
    const history = await this.networking.getHistory();

    const isAdmin = history[0].username ? true : false;
    this.setState({ history: history, isAdmin: isAdmin });
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
      return search.history_id === parseInt(this.state.currentlySelected);
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
      <ThemeProvider theme={theme}>
        {this.state.search ? (
          this.handleRedirect()
        ) : (
          <div className="history-page">
            <NavBar className="navbar" checkLogin={this.props.checkLogin} />
            {this.state.history && (
              <HistoryTable
                history={this.state.history}
                isAdmin={this.state.isAdmin}
                selected={this.state.currentlySelected}
                changeSelected={this.changeSelected}
                updateSearch={this.updateSearch}
              />
            )}
          </div>
        )}
      </ThemeProvider>
    );
  }
}

export default HistoryPage;
