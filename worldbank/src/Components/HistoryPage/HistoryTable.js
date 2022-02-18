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
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "80vh" }}>
            <Table stickyHeader aria-label="Search History">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button
                      disabled={!this.props.selected}
                      onClick={this.handleClick}
                    >
                      Search Again
                    </Button>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", fontSize: 14 }}>
                    Id
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 14 }}
                    align="left"
                  >
                    Country(s)
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 14 }}
                    align="left"
                  >
                    Indicator(s)
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 14 }}
                    align="left"
                  >
                    Start Year
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 14 }}
                    align="left"
                  >
                    End Year
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", fontSize: 14 }}
                    align="left"
                  >
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.history.map((row, i) => (
                  <TableRow
                    hover
                    key={row.history_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Checkbox
                        color="primary"
                        checked={this.props.selected === `${row.history_id}`}
                        value={row.history_id}
                        onChange={this.handleChange}
                      />
                    </TableCell>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.country_name}</TableCell>
                    <TableCell align="left">{row.indicator_name}</TableCell>
                    <TableCell align="left">
                      {row.year ? row.year : ""}
                    </TableCell>
                    <TableCell align="left">
                      {row.year_end ? row.year_end : ""}
                    </TableCell>
                    <TableCell align="left">{row.created_at}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  }
}
export default HistoryTable;
