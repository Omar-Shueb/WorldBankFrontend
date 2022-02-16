import "./App.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LogInPage from "./Components/LogInPage/LogInPage";

import RegisterPage from "./Components/RegisterPage/RegisterPage.js";

import SearchPage from "./Components/SearchPage/SearchPage";

import ResultsPage from "./Components/ResultsPage/ResultsPage";

import Networking from "./Components/Networking";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }
  networking = new Networking();

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = async () => {
    const re = /sessionId=([\w-]+);?/;
    const cookies = await document.cookie;
    if (re.test(cookies)) {
      const loggedIn = await this.networking.getSession();
      this.setState({ loggedIn: loggedIn });
    } else {
      this.setState({ loggedIn: false });
    }
    console.log(this.state.loggedIn);
  };

  loggedIn = () => {
    return (
      <Switch>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/results" render={(props) => <ResultsPage {...props} />} />
        <Redirect from="/" to="/search" />
      </Switch>
    );
  };

  loggedOut = () => {
    return (
      <Switch>
        <Route path="/login">
          <LogInPage checkLogin={this.checkLogin} />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    );
  };

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? this.loggedIn() : this.loggedOut()}
      </div>
    );
  }
}

export default App;
