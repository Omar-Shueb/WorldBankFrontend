import React from "react";
import { withRouter } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Networking from "../Networking";

class RegisterPage extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
    confirmInput: "",
    error: "",
    showPassword: false,
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
      await this.networking.postNewUser(
        this.state.usernameInput,
        this.state.passwordInput
      );
      this.props.history.replace("/login");
    }
  };

  onLogInClick = () => {
    this.props.history.replace("/login");
  };

  onShowPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  getRegisterForm = () => {
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <TextField
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
                      {this.state.showPassword ? (
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
                      {this.state.showPassword ? (
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
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </div>
        </form>
        <Button variant="text" onClick={this.onLogInClick}>
          Log In
        </Button>
      </>
    );
  };

  render() {
    return <>{this.getRegisterForm()}</>;
  }
}

export default withRouter(RegisterPage);
