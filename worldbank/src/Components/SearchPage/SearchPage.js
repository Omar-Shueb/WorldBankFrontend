import React from "react";
import Networking from "../Networking";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { YearPicker } from "react-dropdown-date";
import { countries } from "./countries.js";
import { indicators } from "./indicators.js";
import NavBar from "../NavBar/NavBar";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme.js";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      startYear: "",
      endYear: "",
      indicator: "",
      commitSearch: false,
      indicators: indicators,
    };
    this.countries = countries;
    this.networking = new Networking();
  }

  handleCountryChange = async (event) => {
    await this.setState({ country: event.value });
    const response = await this.networking.getIndicators(this.state.country);
    await this.setState({ indicators: response });
  };

  handleIndicatorChange = (event) => {
    this.setState({ indicator: event.value });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ commitSearch: true });
  };

  getSearchPage = () => {
    return (
      <ThemeProvider theme={theme}>
        <div className="search-page">
          <NavBar checkLogin={this.props.checkLogin} />
          <form onSubmit={this.handleSubmit} className="search-form">
            <div className="search-input">
              <label>Countries:</label>
              <Select
                name="country"
                onChange={this.handleCountryChange}
                options={countries}
              />
            </div>
            <div className="search-input">
              <label>Indicators:</label>
              <Select
                onChange={this.handleIndicatorChange}
                options={this.state.indicators}
              />
            </div>
            <YearPicker
              defaultValue={"Start Year"}
              start={1960}
              end={2014}
              reverse={true}
              value={this.state.startYear}
              onChange={(year) => {
                this.setState({ startYear: year });
              }}
              name={"startYear"}
            />
            <YearPicker
              defaultValue={"End Year"}
              start={this.state.startYear ? this.state.startYear : 1960}
              end={2015}
              reverse={true}
              value={this.state.endYear}
              onChange={(year) => {
                this.setState({ endYear: year });
              }}
              name={"endYear"}
            />

            <Button type="submit" value="Submit" variant="outlined">
              Search
            </Button>
          </form>
        </div>
      </ThemeProvider>
    );
  };

  render() {
    return (
      <div className="App">
        {this.state.commitSearch ? (
          <Redirect
            to={{
              pathname: "/results",
              state: {
                country: this.state.country,
                startYear: this.state.startYear,
                endYear: this.state.endYear,
                indicator: this.state.indicator,
              },
            }}
          />
        ) : (
          this.getSearchPage()
        )}
      </div>
    );
  }
}

export default SearchPage;
