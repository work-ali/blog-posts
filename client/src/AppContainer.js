import React, { Component } from "react";
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import PostsContainer from "./components/PostsContainer";
import SinglePost from "./components/SinglePost";

class AppContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to={"/posts"} />} />
        <Route
          path="/posts/:id"
          render={() => <SinglePost {...this.props} />}
        />
        <Route
          path="/posts"
          render={() => <PostsContainer {...this.props} />}
        />
      </Switch>
    );
  }
}

export default withRouter(AppContainer);
