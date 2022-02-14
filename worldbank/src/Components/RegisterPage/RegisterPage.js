import React from "react";
import { TextField, Button } from "@mui/material";
import Networking from "../Networking";

class RegisterPage extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
    confirmInput: "",
    error: "",
  };

  onInputChange = (event) => {
    if (
      event.target.id === "passwordInput" ||
      event.target.id === "confirmInput"
    ) {
      this.setState({ error: "" });
    }
    this.setState({ [event.target.id]: event.target.value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.passwordInput !== this.state.confirmInput) {
      this.setState({ error: "Passwords don't match!" });
    } else {
      const networking = new Networking();

      networking.postNewUser(
        this.state.usernameInput,
        this.state.passwordInput
      );
    }
  };

  getRegisterForm = () => {
    return (
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
            type="password"
            onChange={this.onInputChange}
            required
          />
        </div>
        <div>
          <TextField
            id="confirmInput"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            onChange={this.onInputChange}
            required
          />
        </div>
        <div>
          <Button type="submit" variant="outlined">
            Submit
          </Button>
        </div>
      </form>
    );
  };

  render() {
    return <>{this.getRegisterForm()}</>;
  }
}

export default RegisterPage;
