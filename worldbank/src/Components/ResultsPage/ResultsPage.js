import React from "react";

import BarGraph from "./BarGraph.js";
import LineGraph from "./LineGraph.js";

import NavBar from "../NavBar/NavBar";

import Networking from "../Networking";

class ResultsPage extends React.Component {
  state = {
    data: "",
  };
  networking = new Networking();

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    let data = await this.networking.postSearch(
      this.props.location.state.country,
      this.props.location.state.indicator,
      this.props.location.state.startYear,
      this.props.location.state.endYear
    );
    const processData = this.processData(data);
    this.setState({ data: processData });
  }

  processData = (data) => {
    const processData = data.map((row) => {
      return {
        indicatorname: row.indicatorname,
        year: parseInt(row.year),
        [row.countryname]: parseInt(row.value),
        countryname: row.countryname,
      };
    });
    return processData;
  };

  getNumberOfYears = (data) => {
    const years = [
      ...new Set(
        data.map((row) => {
          return row.year;
        })
      ),
    ];
    return years;
  };

  getGraphs = () => {
    const indicators = [
      ...new Set(
        this.state.data.map((row) => {
          return row.indicatorname;
        })
      ),
    ];

    const graphs = indicators.map((indicator) => {
      const data = this.state.data.filter((row) => {
        return row.indicatorname === indicator;
      });
      const years = this.getNumberOfYears(data);
      return years.length > 3 ? (
        <LineGraph data={data} indicator={indicator} />
      ) : (
        <BarGraph data={data} indicator={indicator} />
      );
    });
    return graphs;
  };

  render() {
    return (
      <div className="history-page">
        <NavBar className="navbar" />
        {this.state.data && <div className="graphs">{this.getGraphs()}</div>}
      </div>
    );
  }
}

export default ResultsPage;
