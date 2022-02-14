import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LogInPage from "./Components/LogInPage/LogInPage";

import RegisterPage from "./Components/RegisterPage/RegisterPage.js";

import SearchPage from "./Components/SearchPage/SearchPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/login">
            <LogInPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
