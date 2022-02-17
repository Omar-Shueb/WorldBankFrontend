import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme.js";
import Networking from "../Networking";

class LogInPage extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
    error: "",
    showPassword: false,
  };
  networking = new Networking();

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();

    this.setState({ error: "" });

    let json = await this.networking.postLogIn(
      this.state.usernameInput,
      this.state.passwordInput
    );
    json.success
      ? this.props.checkLogin()
      : this.setState({ error: json.error });
  };

  onShowPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  getLogInForm = () => {
    return (
      <>
        <ThemeProvider theme={theme}>
          <form onSubmit={this.onFormSubmit}>
            <div>
              <TextField
                color="secondary"
                sx={{ width: "20vw" }}
                id="usernameInput"
                label="Username"
                variant="outlined"
                margin="normal"
                onChange={this.onInputChange}
                error={this.state.error.length > 0}
                required
              />
            </div>
            <div>
              <TextField
                color="secondary"
                sx={{ width: "20vw" }}
                id="passwordInput"
                label="Password"
                variant="outlined"
                margin="normal"
                type={this.state.showPassword ? "text" : "password"}
                onChange={this.onInputChange}
                error={this.state.error.length > 0}
                helperText={this.state.error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                        onClick={this.onShowPasswordClick}
                      >
                        {!this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />
            </div>

            <div>
              <Link to="/register">
                <Button
                  variant="outlined"
                  sx={{ width: "10vw", marginTop: "3vh" }}
                >
                  Register
                </Button>
              </Link>
              <Button
                type="submit"
                variant="outlined"
                disabled={
                  !this.state.usernameInput || !this.state.passwordInput
                }
                sx={{ width: "10vw", marginTop: "3vh" }}
              >
                Log In
              </Button>
            </div>
          </form>
        </ThemeProvider>
      </>
    );
  };

  render() {
    return <div className="App">{this.getLogInForm()}</div>;
  }
}

export default LogInPage;
