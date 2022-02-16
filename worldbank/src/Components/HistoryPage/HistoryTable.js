import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

class HistoryTable extends React.Component {
  handleChange = (event) => {
    this.props.changeSelected(event.target.value);
  };

  handleClick = () => {
    this.props.updateSearch();
  };

  render() {
    return (
      <div className="history-table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Search History">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Button disabled={!this.props.selected} onClick={this.handleClick}>
                    Search Again
                  </Button>
                </TableCell>
                <TableCell>Id</TableCell>
                <TableCell align="left">Country(s)</TableCell>
                <TableCell align="left">Indicator(s)</TableCell>
                <TableCell align="left">Start Year</TableCell>
                <TableCell align="left">End Year</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.history.map((row, i) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      checked={this.props.selected === `${row.id}`}
                      value={row.id}
                      onChange={this.handleChange}
                    />
                  </TableCell>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{row.country_name}</TableCell>
                  <TableCell align="left">{row.indicator_name}</TableCell>
                  <TableCell align="left">{row.year ? row.year : ""}</TableCell>
                  <TableCell align="left">{row.year_end ? row.year_end : ""}</TableCell>
                  <TableCell align="left">{row.created_at}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
export default HistoryTable;
