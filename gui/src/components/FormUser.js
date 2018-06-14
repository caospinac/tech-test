import React from 'react';
import { Button, Form, FormGroup, Label, Input ,
  ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import request from 'superagent';

class FormUser extends React.Component {
    constructor(props) {
      super(props);
      this.successRegistration = props.successRegistration;
      this.state = {
        sendUserModalToggle: props.sendUserModalToggle,
        name: null,
        email: null,
        role: null
      }
    }

    componentWillReceiveProps = (props) => {
      this.setState({
        sendUserModalToggle: props.sendUserModalToggle
      });
    }

    sendNowClickHandler = () => {
      const { name, email, role } = this.state;
      if (name && email && role) {
        request.post('http://localhost:8000/api/send_user')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({name: name, email: email, role: role})
        .then(() => {
          this.successRegistration(true)
        })
        .catch(err => {
          console.log(err);
          this.successRegistration(false)
        });
      }
    }

    nameOnChange = (e) => {
      this.setState({
        name: e.target.value
      })
    }

    emailOnChange = (e) => {
      this.setState({
        email: e.target.value
      })
    }

    roleOnChange = (e) => {
      this.setState({
        role: e.target.value
      })
    }

    render() {
    return (
      <div>
        <ModalHeader toggle={this.state.sendUserModalToggle}>New user</ModalHeader>
        <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormGroup>
              <Label for="name" >Name</Label>
              <Input type="text" name="name" id="name" placeholder="Name Lastname"
                onChange={this.nameOnChange} autoComplete="off" />
            </FormGroup>
            <FormGroup>
              <Label for="email" >Email</Label>
              <Input type="email" name="email" id="email" placeholder="email@examp.le"
                onChange={this.emailOnChange} autoComplete="off" />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input type="select" name="role" id="role" onChange={this.roleOnChange}>
                <option value={0} selected> -- Select role --</option>
                <option value="end-user">End user</option>
                <option value="agent">Agent</option>
                <option value="admin">Admin</option>
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="info" onClick={this.sendNowClickHandler}>
            Send now
          </Button>{' '}
          <Button color="secondary" onClick={this.state.sendUserModalToggle}>Cancel</Button>
        </ModalFooter>
      </div>
    );
  }
}

export default FormUser
