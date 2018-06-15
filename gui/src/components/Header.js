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

import FormUser from './FormUser'

class Header extends Component {
  constructor(props) {
    super(props);
    this.showMessage = props.showMessage;
    this.updateData = props.updateData;
    this.state = {
      isOpen: false,
      modal: false,
      sendUserModal: false,
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

  successRegistration = (success) => {
    if (success){
      this.showMessage('Successful user registration! Watch for updates', 'success')
    } else {
      this.showMessage('An error occurred while trying to send the user :S', 'danger')
    }
    this.setState({
      sendUserModal: false
    });
  }
  
  sendUserModalToggle = () => {
    this.setState({
      sendUserModal: !this.state.sendUserModal
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
            {interactions.new_count} new interactions{interactions.new_count > 1 ? "s": ""}
          </ListGroupItem>
        }
        {
          interactions.update_count > 0 &&
          <ListGroupItem className="justify-content-between">
            {interactions.update_count} updated interaction{interactions.update_count > 1 ? "s": ""}
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
                  <NavLink href="#" onClick={this.sendUserModalToggle}>
                    New user
                  </NavLink>
                  <Modal isOpen={this.state.sendUserModal} toggle={this.sendUserModalToggle}
                  className={this.props.className}>
                    <FormUser sendUserModalToggle={this.sendUserModalToggle}
                      successRegistration={this.successRegistration} />
                  </Modal>
                </NavItem>
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
