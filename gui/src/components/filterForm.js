import React, { Component } from 'react';
import {
  Container, Form, FormGroup, Label, Input, Row, Col
} from 'reactstrap';

import InteractionsTable from './interactions_table';


class FilterForm extends Component {

  constructor(props){
    super(props);
    this.values = {
      status: ['new', 'open', 'pending', 'hold', 'solved', 'closed'],
      priority: ['urgent', 'high', 'normal', 'low'],
      type: ['problem', 'incident', 'question', 'task'],
    }
  }

  render() {
    const FilterSelectGroup = props => {
      const { name, options } = props
      return (
        <FormGroup>
          <Label for={"id" + name}>{name}</Label>
          <Input type="select" name={name} id={"id" + name}>
          <option selected value> -- all -- </option>
          {
            options.map((v, i) => {
              return (
                <option key={i}>{v}</option>
              )
            })
          }
          </Input>
        </FormGroup>
      )
    }
    const { status, priority, type } = this.values;
    return (
      <Container>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="selectUsers">Users</Label>
                <Input type="select" name="selectUsers" id="selectUsers" multiple>
                  <option>1</option>
                  <option>2</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <Row>
                <Col>
                  <FormGroup>
                    <Input type="text" name="email" placeholder="User ID" autocomplete="off" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Input type="text" name="email" placeholder="Interaction ID" autocomplete="off" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col><FilterSelectGroup name="Status" options={status} /></Col>
                <Col><FilterSelectGroup name="Priority" options={priority} /></Col>
                <Col><FilterSelectGroup name="Type" options={type} /></Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <InteractionsTable />
      </Container>
    );
  }
}

export default FilterForm;
