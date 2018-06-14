import React, { Component } from 'react';
import {
  Badge,
  Button,
  Collapse,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
    this.updateData = props.updateData;
    this.state = {
      isOpen: false,
      modal: false,
      newData: props.newData
    };
  }

  componentWillReceiveProps = (props) => {
    this.setState({
      newData: props.newData,
      modal: false
    });
  }

  responsiveToggle =() => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  modalToggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  updateNowClickHandler = () => {
    this.setState({
      modal: false
    });
    this.updateData();
  }

  modalBody = (total) => {
    const { users, interactions } = this.state.newData;
    if (!total) {
      return <h1>Everything is up to date.</h1>
    }
    return (
      <ListGroup>
        {
          users.new_count > 0 &&
          <ListGroupItem className="justify-content-between">
            {users.new_count} new user{users.new_count > 1 ? "s": ""}
          </ListGroupItem>
        }
        {
          users.update_count > 0 &&
          <ListGroupItem className="justify-content-between">
            {users.update_count} updated user{users.update_count > 1 ? "s": ""}
          </ListGroupItem>
        }
        {
          interactions.new_count > 0 &&
          <ListGroupItem className="justify-content-between">
            {interactions.new_count} new user{interactions.new_count > 1 ? "s": ""}
          </ListGroupItem>
        }
        {
          interactions.update_count > 0 &&
          <ListGroupItem className="justify-content-between">
            {interactions.update_count} updated user{interactions.update_count > 1 ? "s": ""}
          </ListGroupItem>
        }
      </ListGroup>
    )
  }

  modalFooter = (total) => {
    if (!total) {
      return (
        <div>
          <Button color="info" onClick={this.modalToggle}>Accept</Button>
        </div>
      )
    }
    return (
      <div>
        <Button color="info" onClick={this.updateNowClickHandler}>
          Update now
        </Button>{' '}
        <Button color="secondary" onClick={this.modalToggle}>Cancel</Button>
      </div>
    )
  }

  updateBadge = (val) => {
    if (!val) {
      return <Badge color="secondary">{val}</Badge>
    }
    return <Badge color="info">{val}</Badge>
  }

  render() {
    const { users, interactions } = this.state.newData;
    const totalNews = (
      users.new_count + users.update_count + interactions.new_count +
      interactions.update_count
    )
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Container>
            <NavbarBrand href="/">Data view</NavbarBrand>
            <NavbarToggler onClick={this.responsiveToggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#" onClick={this.modalToggle}>
                    Updates {this.updateBadge(totalNews)}
                  </NavLink>
                  <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.modalToggle}>Updates</ModalHeader>
                    <ModalBody>
                    { this.modalBody(totalNews) }
                    </ModalBody>
                    <ModalFooter>
                    { this.modalFooter(totalNews) }
                    </ModalFooter>
                  </Modal>
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