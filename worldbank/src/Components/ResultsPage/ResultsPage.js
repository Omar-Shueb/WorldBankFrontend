import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
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
        <NavBar className="navbar" />
        <div>
          <LineChart width={1000} height={400} data={this.state.data}>
            <Line type="monotone" dataKey="value" stroke="#FF4500" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis
              type="number"
              domain={[
                (dataMin) => 0 - Math.abs(dataMin),
                (dataMax) => Math.ceil((dataMax * 4) / 5) * 5,
              ]}
            />

            <Tooltip />
          </LineChart>
          <BarChart width={1000} height={300} data={this.state.data}>
            <CartesianGrid />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#FF4500" />
          </BarChart>
        </div>
      </div>
    );
  }
  render() {
    return <>{this.getGraphs()}</>;
  }
}

export default ResultsPage;
