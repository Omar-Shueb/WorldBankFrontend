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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

class Graph extends React.Component {
  getGraphs() {
    return this.props.line ? (
      <Card variant="outlined" sx={{ width: "600px" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {this.props.data.country}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {this.props.data.indicator}
          </Typography>
          <LineChart
            width={500}
            height={400}
            data={this.props.data.data}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
          >
            <Line type="monotone" dataKey="value" stroke="#ff5722" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis
              type="number"
              // domain={[
              //   (dataMin) => Math.floor(dataMin * 0.99),
              //   (dataMax) => Math.round(dataMax * 1.01),
              // ]}
            />
            <Tooltip />
          </LineChart>
        </CardContent>
      </Card>
    ) : (
      <Card variant="outlined" sx={{ width: "600px" }}>
        <CardContent>
          <BarChart width={500} height={300} data={this.props.data.data}>
            <CartesianGrid />
            <XAxis dataKey="year" />
            <YAxis type="number" />
            <Tooltip />
            <Bar dataKey="value" fill="#ff5722" />
          </BarChart>
        </CardContent>
      </Card>
    );
  }

  render() {
    return <div>{this.getGraphs()}</div>;
  }
}

export default Graph;
