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

  modalBody = () => {
    const { users, interactions } = this.state.newData;
    if (!(users + interactions)) {
      return <h1>Everything is up to date.</h1>
    }
    return (
      <ListGroup>
        <ListGroupItem className="justify-content-between">
          Users <Badge pill>{users}</Badge>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between">
          Interactions <Badge pill>{interactions}</Badge>
        </ListGroupItem>
      </ListGroup>
    )
  }

  modalFooter = () => {
    const { users, interactions } = this.state.newData;
    if (!(users + interactions)) {
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

  updateBadge = () => {
    const { users, interactions } = this.state.newData;
    let val = users + interactions
    if (!val) {
      return <Badge color="secondary">{val}</Badge>
    }
    return <Badge color="info">{val}</Badge>
  }

  render() {
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
                    Updates {this.updateBadge()}
                  </NavLink>
                  <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
                    <ModalHeader toggle={this.modalToggle}>Updates</ModalHeader>
                    <ModalBody>
                    { this.modalBody() }
                    </ModalBody>
                    <ModalFooter>
                    { this.modalFooter() }
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
