import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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

    let json = await this.networking.postLogIn(this.state.usernameInput, this.state.passwordInput);
    json.success ? this.props.checkLogin() : this.setState({ error: json.error });
  };

  onShowPasswordClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  getLogInForm = () => {
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
              error={this.state.error.length > 0}
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
              helperText={this.state.error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" edge="end" onClick={this.onShowPasswordClick}>
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </div>

          <div>
            <Button type="submit" variant="outlined">
              Log In
            </Button>
          </div>
        </form>
        <Link to="/register">
          <Button variant="text">Register</Button>
        </Link>
      </>
    );
  };

  render() {
    return <>{this.getLogInForm()}</>;
  }
}

export default LogInPage;
