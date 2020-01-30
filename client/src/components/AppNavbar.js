import React, { Component } from "react";
import { Navbar, NavbarToggler, NavbarBrand, Container } from "reactstrap";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Blog Post</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
