import React from "react";
import {
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

class LineGraph extends React.Component {
  getCountires = () => {
    const countries = [
      ...new Set(this.props.data.map((row) => row.countryname)),
    ];
    return countries;
  };

  getLines = () => {
    const colors = [
      "#003f5c",
      "#ffa600",
      "#2f4b7c",
      "#ff7c43",
      "#665191",
      "#a05195",
      "#f95d6a",
      `#d45087`,
    ];
    const countries = this.getCountires();
    const lines = countries.map((country, i) => {
      return (
        <Line
          dot={null}
          connectNulls
          type="monotone"
          dataKey={country}
          stroke={colors[i]}
        />
      );
    });
    return lines;
  };

  render() {
    return (
      <Card variant="outlined" sx={{ width: "600px" }} className="graph">
        <CardContent>
          <Typography variant="h5" component="div">
            {this.props.indicator}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {this.getCountires().join(", ")}
          </Typography>
          <LineChart
            width={500}
            height={400}
            data={this.props.data}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
          >
            <Legend verticalAlign="bottom" height={36} />
            {this.getLines()}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis type="number" />
            <Tooltip />
          </LineChart>
        </CardContent>
      </Card>
    );
  }
}

export default LineGraph;
