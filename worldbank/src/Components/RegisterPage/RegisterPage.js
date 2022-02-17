import React from "react";
import { Link, Redirect } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../Theme.js";
import Networking from "../Networking";

class RegisterPage extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
    confirmInput: "",
    error: "",
    showPassword: false,
    redirect: false,
  };
  networking = new Networking();

  onInputChange = async (event) => {
    await this.setState({ [event.target.id]: event.target.value });
    if (this.state.passwordInput !== this.state.confirmInput) {
      this.setState({ error: "Passwords don't match!" });
    } else {
      this.setState({ error: "" });
    }
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    if (this.state.passwordInput !== this.state.confirmInput) {
      this.setState({ error: "Passwords don't match!" });
    } else {
      const response = await this.networking.postNewUser(
        this.state.usernameInput,
        this.state.passwordInput
      );
      if (response.success) {
        this.setState({ redirect: true });
      } else {
        this.setState({ error: response.error });
      }
    }
  };
  onShowPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  getRegisterForm = () => {
    return (
      <ThemeProvider theme={theme}>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <TextField
              sx={{ width: "20vw" }}
              color="secondary"
              id="usernameInput"
              label="Username"
              variant="outlined"
              margin="normal"
              onChange={this.onInputChange}
              required
            />
          </div>
          <div>
            <TextField
              sx={{ width: "20vw" }}
              color="secondary"
              id="passwordInput"
              label="Password"
              variant="outlined"
              margin="normal"
              type={this.state.showPassword ? "text" : "password"}
              onChange={this.onInputChange}
              error={this.state.error.length > 0}
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
            <TextField
              sx={{ width: "20vw" }}
              color="secondary"
              id="confirmInput"
              label="Confirm Password"
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
            <Link to="/login">
              <Button
                variant="outlined"
                onClick={this.onLogInClick}
                sx={{ width: "10vw", marginTop: "3vh" }}
              >
                Log In
              </Button>
            </Link>
            <Button
              type="submit"
              variant="outlined"
              sx={{ width: "10vw", marginTop: "3vh" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </ThemeProvider>
    );
  };

  render() {
    return (
      <div className="App">
        {this.state.redirect ? (
          <Redirect to="/login" />
        ) : (
          this.getRegisterForm()
        )}
      </div>
    );
  }
}

export default RegisterPage;
