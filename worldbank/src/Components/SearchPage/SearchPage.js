import React from "react";
import Networking from "../Networking";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { YearPicker } from "react-dropdown-date";
import { countries } from "./countries.js";
import { indicators } from "./indicators.js";
import NavBar from "../NavBar/NavBar";
import { Button, IconButton } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// body : {countries: [...], indicators: [...], year: ... , yearEnd : ...}

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: [],
      startYear: "",
      endYear: "",
      indicator: [],
      commitSearch: false,
      indicators: indicators,
      indicatorDropdowns: 1,
      countryDropdowns: 1,
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
    const dummyArray = this.state.indicator.map((x) => x);

    dummyArray[event.key] = event.value;

    console.log(event);

    this.setState({ indicator: dummyArray });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ commitSearch: true });
  };

  getIndicatorSelector = (indicatorDropdown) => {
    const indicatorSelectors = [];

    for (let i = 0; i < indicatorDropdown; i++) {
      indicatorSelectors.push(
        <div style={{ marginBottom: "2vh" }}>
          <Select
            styles={{ margin: "100px" }}
            key={i}
            name={i}
            onChange={(event, target) => {
              const dummyArray = this.state.indicator.map((x) => x);

              dummyArray[target.name] = event.value;

              this.setState({ indicator: dummyArray });
            }}
            options={this.state.indicators}
          />
        </div>
      );
    }
    return <>{indicatorSelectors}</>;
  };

  getAllIndicators = () => {
    return (
      <div className="search-input">
        <label>Indicators:</label>
        {this.getIndicatorSelector(this.state.indicatorDropdowns)}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() =>
              this.setState({
                indicatorDropdowns: this.state.indicatorDropdowns - 1,
              })
            }
            disabled={this.state.indicatorDropdowns === 1}
          >
            <ExpandLessIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              this.setState({
                indicatorDropdowns: this.state.indicatorDropdowns + 1,
              })
            }
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  getCountrySelector = (countryDropdown) => {
    const countrySelectors = [];

    for (let i = 0; i < countryDropdown; i++) {
      countrySelectors.push(
        <div style={{ marginBottom: "2vh" }}>
          <Select
            styles={{ margin: "100px" }}
            key={i}
            name={i}
            onChange={(event, target) => {
              const dummyArray = this.state.country.map((x) => x);

              dummyArray[target.name] = event.value;

              this.setState({ country: dummyArray });
            }}
            options={countries}
          />
        </div>
      );
    }
    return <>{countrySelectors}</>;
  };

  getAllCountries = () => {
    return (
      <div className="search-input">
        <label>Countries:</label>
        {this.getCountrySelector(this.state.countryDropdowns)}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={() =>
              this.setState({
                countryDropdowns: this.state.countryDropdowns - 1,
              })
            }
            disabled={this.state.countryDropdowns === 1}
          >
            <ExpandLessIcon />
          </IconButton>
          <IconButton
            onClick={() =>
              this.setState({
                countryDropdowns: this.state.countryDropdowns + 1,
              })
            }
          >
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
    );
  };

  getSearchPage = () => {
    return (
      <ThemeProvider theme={theme}>
        <div className="search-page">
          <NavBar checkLogin={this.props.checkLogin} />
          <form onSubmit={this.handleSubmit} className="search-form">
            {this.getAllCountries()}
            {this.getAllIndicators()}
            <div className="year-box">
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
                classes="year-drop"
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
                classes="year-drop"
              />

              <Button
                type="submit"
                value="Submit"
                variant="outlined"
                style={{ maxHeight: "5vh", marginTop: "2.5vh" }}
              >
                Search
              </Button>
            </div>
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
                indicator: this.state.indicator.length
                  ? this.state.indicator
                  : this.state.indicators.map((entry) => entry.value),
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
