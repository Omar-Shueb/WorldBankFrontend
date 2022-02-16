import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./NavBar.css";
import logo from "./logo.png";
import Networking from "../Networking";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff8a50",
      main: "#ff5722",
      dark: "#c41c00",
      contrastText: "#fafafa",
    },
    secondary: {
      light: "#ffffff",
      main: "#f5f5f5",
      dark: "#c2c2c2",
      contrastText: "#000",
    },
  },
});

class NavBar extends React.Component {
  networking = new Networking();

  handleLogout = async () => {
    await this.networking.patchSession();
    await this.props.checkLogin();
  };

  render() {
    return (
      <div className="header">
        <ThemeProvider theme={theme}>
          <AppBar color="primary">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  mr: 2,
                  display: { md: "flex" },
                  background: "#ffffff",
                  height: "9vh",
                  width: "9vw",
                }}
              >
                <img className="logo" alt="world bank logo" src={logo} />
                <ButtonGroup color="secondary" variant="text">
                  <Button component={Link} to={"/search"}>
                    Search
                  </Button>
                  <Button component={Link} to={"/history"}>
                    History
                  </Button>
                </ButtonGroup>
              </Typography>
              <div>
                <Button color="secondary" onClick={this.handleLogout}>
                  Log Out
                </Button>
              </div>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </div>
    );
  }
}

export default NavBar;
