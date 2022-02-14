import React from "react";
import { withRouter } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import Networking from "../Networking";

class LogInPage extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
  };
  networking = new Networking();

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    //// networking
    this.networking.postLogIn(
      this.state.usernameInput,
      this.state.passwordInput
    );
  };

  onRegisterClick = (event) => {
    this.props.history.replace("/register");
  };

  getLogInForm = () => {
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <div>
            <TextField
              id="usernameInput"
              label="Username"
              variant="outlined"
              margin="normal"
              onChange={this.onChange}
              required
            />
          </div>
          <div>
            <TextField
              id="passwordInput"
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              onChange={this.onChange}
              required
            />
          </div>

          <div>
            <Button type="submit" variant="outlined">
              Log In
            </Button>
          </div>
        </form>
        <Button variant="text" onClick={this.onRegisterClick}>
          Register
        </Button>
      </>
    );
  };

  render() {
    return <>{this.getLogInForm()}</>;
  }
}

export default withRouter(LogInPage);
