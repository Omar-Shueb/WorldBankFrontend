import React from "react";
import { TextField, Button } from "@mui/material";

class RegisterPage extends React.Component {
  state = {
    usernameInput: "",
    passwordInput: "",
    confirmInput: "",
    error: "",
  };

  onChange = (event) => {
    if (
      event.target.id === "passwordInput" ||
      event.target.id === "confirmInput"
    ) {
      this.setState({ error: "" });
    }
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.passwordInput !== this.state.confirmInput) {
      this.setState({ error: "Passwords don't match!" });
    }
    console.log(this.state.usernameInput);
    console.log(this.state.passwordInput);
    console.log(this.state.confirmInput);
  };

  getRegisterForm = () => {
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
          <TextField
            id="confirmInput"
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            onChange={this.onChange}
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
