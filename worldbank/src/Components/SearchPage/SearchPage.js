import React from "react";
import Networking from "../Networking";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { YearPicker } from "react-dropdown-date";
import { countries } from "./countries.js";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      startYear: "",
      indicator: "",
      indicators: [],
      commitSearch: false,
    };
    this.countries = countries;
  }
  networking = new Networking();

  async componentDidMount() {
    const indicators = await this.networking.getDistinctIndicators();
    this.setState({ indicators: indicators });
  }

  handleCountryChange = (event) => {
    this.setState({ country: event.value });
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
      <div className="search-page">
        {/* <NavBar /> */}
        <form onSubmit={this.handleSubmit} className="search-form">
          <div className="search-input">
            <label>Countries:</label>
            <Select
              name="country"
              onChange={this.handleCountryChange}
              options={this.countries}
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
            end={2015}
            reverse={true}
            required={true}
            value={this.state.startYear}
            onChange={(year) => {
              this.setState({ startYear: year });
            }}
            name={"startYear"}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.state.commitSearch ? (
          <Redirect
            to={{
              pathname: "/results",
              state: {
                country: this.state.country,
                startYear: this.state.startYear,
                indicator: this.state.indicator,
              },
            }}
          />
        ) : (
          this.getSearchPage()
        )}
      </>
    );
  }
}

export default SearchPage;
