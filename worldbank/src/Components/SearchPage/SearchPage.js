import React from "react";
import Networking from "../Networking";
import Select from "react-select";
import { YearPicker } from "react-dropdown-date";
import { countries } from "./countries.js";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { country: "", startYear: "", endYear: "", indicator: "" };
    this.Networking = new Networking();
    this.countries = countries;
    // do the same with indicators
  }

  handleCountryChange = (event) => {
    this.setState({ country: event.value });
  };

  handleChange = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.country, this.state.indicator, this.state.startYear, this.state.endYear);
    this.Networking.postSearch(this.state.country, this.state.indicator, this.state.startYear, this.state.endYear);
  };

  render() {
    return (
      <div className="search-page">
        {/* <NavBar /> */}
        <form onSubmit={this.handleSubmit} className="search-form">
          <div className="search-input">
            <label>Countries:</label>
            <Select name="country" onChange={this.handleCountryChange} options={this.countries} />
          </div>
          <div className="search-input">
            <label>Indicators:</label>
            <Select onChange={this.handleChange} options={this.countries} />
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
          <YearPicker
            defaultValue={"End Year"}
            start={1960}
            end={2015}
            reverse={true}
            required={true}
            value={this.state.endYear}
            onChange={(year) => {
              this.setState({ endYear: year });
            }}
            name={"endYear"}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SearchPage;
