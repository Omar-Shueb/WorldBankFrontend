import React from "react";
import Networking from "../Networking";
import Select from "react-select";
import { YearPicker } from "react-dropdown-date";
import { countries } from "./countries.js";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { country: "", startYear: "", indicator: "", indicators: [] };
    this.countries = countries;
  }
  networking = new Networking();

  async componentDidMount() {
    const indicators = await this.networking.getDistinctIndicators();
    this.setState({ indicators: indicators });
    console.log(indicators);

  }

  handleCountryChange = (event) => {
    this.setState({ country: event.value });
  };

  handleIndicatorChange = (event) => {
    this.setState({ indicator: event.value });
  };

  handleChange = (event) => {
    console.log(event);
    this.setState({ [event.target.name]: event.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.country, this.state.indicator, this.state.startYear);
    this.networking.postSearch(this.state.country, this.state.indicator, this.state.startYear);
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
  }
}

export default SearchPage;
