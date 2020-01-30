import React, { Component } from "react";
import AppNavbar from "./AppNavbar";
import PostsList from "./PostsList";
import AddNewPost from "./AddNewPost";
import { Container } from "reactstrap";

export default class PostsContainer extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <AddNewPost />
          <PostsList {...this.props} />
        </Container>
      </div>
    );
  }
}
