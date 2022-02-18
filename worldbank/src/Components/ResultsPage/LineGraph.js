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
  getCountries = () => {
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
    const countries = this.getCountries();
    const lines = countries.map((country, i) => {
      return (
        <Line
          dot={null}
          connectNulls
          type="monotone"
          dataKey={country}
          stroke={colors[i]}
          strokeWidth={4}
        />
      );
    });
    return lines;
  };

  render() {
    const mergedData = Object.values(
      this.props.data.reduce((r, { year, ...rest }) => {
        r[year] = r[year] || { year };
        r[year] = { ...r[year], ...rest };
        return r;
      }, {})
    );

    return (
      <Card variant="outlined" sx={{ width: "600px" }} className="graph">
        <CardContent>
          <Typography variant="h5" component="div">
            {this.props.indicator}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {this.getCountries().join(", ")}
          </Typography>
          <LineChart
            width={500}
            height={400}
            data={mergedData}
            margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
          >
            <Legend verticalAlign="bottom" height={36} />
            {this.getLines()}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="year" />
            <YAxis
              type="number"
              domain={[
                (dataMin) => Math.floor(dataMin * 0.99),
                (dataMax) => Math.ceil(dataMax * 1.01),
              ]}
            />
            <Tooltip />
          </LineChart>
        </CardContent>
      </Card>
    );
  }
}

export default LineGraph;
