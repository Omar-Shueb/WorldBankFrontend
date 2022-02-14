import React from "react";
import Networking from "../Networking";
import Select from "react-select";
import { countries } from "./countries.js";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
    this.Networking = new Networking();
    this.countries = countries;
    // do the same with indicators
  }

  handleChange = (event) => {
    this.setState({ search: event.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.search);
    // do something with networking
  };

  render() {
    return (
      <div className="search-page">
        {/* <NavBar /> */}
        <form onSubmit={this.handleSubmit} className="search-form">
          <div className="search-input">
            <label>Countries:</label>
            <Select onChange={this.handleChange} options={this.countries} />
          </div>
          <div className="search-input">
            <label>Indicators:</label>
            <Select onChange={this.handleChange} options={this.countries} />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SearchPage;
