import React from "react";
import { TextField, Button } from "@mui/material";
import Networking from "../Networking";

class LogInPage extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
  };
  networking = new Networking();

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    //// networking
    this.networking.postLogIn(this.state.usernameInput, this.state.passwordInput);
  };

  getLogInForm = () => {
    return (
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
    );
  };

  render() {
    return <>{this.getLogInForm()}</>;
  }
}

export default LogInPage;
