import React, { Component } from 'react';
import {
  Badge,
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle =() => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Container>
            <NavbarBrand href="/">Data view</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#">Updates <Badge color="secondary">0</Badge>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/carlosaospinac/tech-test" target="_blank">
                    GitHub
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default Header;
