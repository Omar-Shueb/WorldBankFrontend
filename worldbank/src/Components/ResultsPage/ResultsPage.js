import React from "react";
import Graph from "./Graph.js";
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
      this.props.location.state.indicator
    );
    data = this.processData(data);
    this.setState({ data: data });
  }

  processData(data) {
    const finalData = [];
    data.forEach((item) => {
      finalData.push({ name: item.year, year: item.year, value: item.value });
    });
    return data;
  }

  getGraphs() {
    return (
      <div>
        <Graph line={false} data={this.state.data} />
      </div>
    );
  }
  render() {
    return <>{this.getGraphs()}</>;
  }
}

export default ResultsPage;
