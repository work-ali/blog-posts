import React, { Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppContainer from "./AppContainer";
import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <AppContainer path="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
export default App;
