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

class Graph extends React.Component {
  getGraphs() {
    return this.props.line ? (
      <LineChart width={600} height={400} data={this.props.data}>
        <Line type="monotone" dataKey="value" stroke="#ff5722" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="year" />
        <YAxis
          type="number"
          domain={[
            (dataMin) => Math.round(Math.round(dataMin / 2.5) / 10) * 10,
            (dataMax) => Math.ceil((dataMax * 1.5) / 5) * 5,
          ]}
        />
        <Tooltip />
      </LineChart>
    ) : (
      <BarChart width={600} height={300} data={this.props.data}>
        <CartesianGrid />
        <XAxis dataKey="year" />
        <YAxis
          type="number"
          domain={[
            (dataMin) => 0,
            (dataMax) => Math.ceil((dataMax * 1.5) / 5) * 5,
          ]}
        />
        <Tooltip />
        <Bar dataKey="value" fill="#ff5722" />
      </BarChart>
    );
  }

  render() {
    return <>{this.getGraphs()}</>;
  }
}

export default Graph;
