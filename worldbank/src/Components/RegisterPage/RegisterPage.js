import React from "react";
import { Link } from "react-router-dom";
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
  onShowPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  getRegisterForm = () => {
    return (
      <>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <TextField
              sx={{ width: "20vw" }}
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
                sx={{ width: "10vw" }}
              >
                Log In
              </Button>
            </Link>
            <Button type="submit" variant="outlined" sx={{ width: "10vw" }}>
              Submit
            </Button>
          </div>
        </form>
      </>
    );
  };

  render() {
    return <>{this.getRegisterForm()}</>;
  }
}

export default RegisterPage;
