import React, { Component } from 'react';
import {
  Container, Form, FormGroup, Label, Input, Row, Col, CustomInput
} from 'reactstrap';

import InteractionsTable from './InteractionsTable';


class FilterForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: props.users,
      interactions: props.interactions,
      filterSearchById: false,
      filterInteractionId: null,
      filterSelectUsers: null,
      filterMinDate: '',
      filterMaxDate: '',
      filterStatus: null,
      filterPriority: null,
      filterType: null
    }
    this.values = {
      status: ['new', 'open', 'pending', 'hold', 'solved', 'closed'],
      priority: ['urgent', 'high', 'normal', 'low'],
      type: ['problem', 'incident', 'question', 'task'],
    }
  }

  _capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({
      users: newProps.users,
      interactions: newProps.interactions,
    });
  }

  searchByID_OnChangeHandler = (e) => {
    this.setState({
      filterSearchById: e.target.checked
    });
  }

  interactionID_OnChangeHandler = (e) => {
    this.setState({
      filterInteractionId: e.target.value
    });
  }

  selectUsersOnChangeHandler = (e) => {
    this.setState({
      filterSelectUsers: Number(e.target.value)
    });
  }

  minDateOnChangeHandler = (e) => {
    const { filterMaxDate } = this.state;
    this.setState({
      filterMinDate: e.target.value,
      filterMaxDate: e.target.value > filterMaxDate ? e.target.value : filterMaxDate
    });
  }

  maxDateOnChangeHandler = (e) => {
    const { filterMinDate } = this.state;
    this.setState({
      filterMaxDate: e.target.value,
      filterMinDate: e.target.value < filterMinDate ? e.target.value : filterMinDate
    });
  }

  selectStatusOnChangeHandler = (e) => {
    this.setState({
      filterStatus: Number(e.target.value) + 1 ? null : e.target.value
    });
  }

  selectPriorityOnChangeHandler = (e) => {
    this.setState({
      filterPriority: Number(e.target.value) + 1 ? null : e.target.value
    });
  }

  selectTypeOnChangeHandler = (e) => {
    this.setState({
      filterType: Number(e.target.value) + 1 ? null : e.target.value
    });
  }

  render() {
    const { status, priority, type } = this.values;
    const { users, interactions } = this.state;
    const {
      filterSearchById,
      filterInteractionId,
      filterSelectUsers,
      filterMinDate,
      filterMaxDate,
      filterStatus,
      filterPriority,
      filterType } = this.state
    const filters = {
      searchById: filterSearchById,
      interactionId: filterInteractionId,
      selectUsers: filterSelectUsers,
      minDate: filterMinDate,
      maxDate: filterMaxDate,
      status: filterStatus,
      priority: filterPriority,
      type: filterType
    }

    return (
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <Form inline onSubmit={(e) => e.preventDefault() }>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <CustomInput type="checkbox" id="exampleCustomCheckbox"
                    label="Search by ID" onChange={this.searchByID_OnChangeHandler} />
                  </FormGroup>
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <Input type="text" name="interactionID" id="interactionID"
                    placeholder="Interaction ID" onChange={this.interactionID_OnChangeHandler}
                    autoComplete="off" disabled={!filterSearchById} />
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Label for="selectUsers">Users</Label>
                    <Input type="select" name="selectUsers" id="selectUsers" multiple 
                      onChange={this.selectUsersOnChangeHandler} disabled={filterSearchById} bsSize="lg">
                      <option selected value={0}> -- All -- </option>
                    {
                      users.map((v, i) => {
                        return (
                          <option key={i} value={v.integration_id}>
                            {v.integration_id} - {v.first_name} {v.last_name}
                          </option>
                        )
                      })
                    }
                    </Input>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="minDate" className="mr-sm-2">From </Label>
                    <Input type="date" name="date" id="minDate"
                      onChange={this.minDateOnChangeHandler} disabled={filterSearchById} />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="maxDate" className="mr-sm-2">To</Label>
                    <Input type="date" name="date" id="maxDate" value={filterMaxDate}
                      onChange={this.maxDateOnChangeHandler} disabled={filterSearchById} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                <FormGroup>
                  <Label for="idStatus">Status</Label>
                  <Input type="select" name="status" id="idStatus"
                    onChange={this.selectStatusOnChangeHandler} disabled={filterSearchById}>
                  <option selected value={0}> -- All -- </option>
                  {
                    status.map((v, i) => {
                      return (
                        <option key={i} value={v}>{this._capitalize(v)}</option>
                      )
                    })
                  }
                  </Input>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label for="idPriority">Priority</Label>
                  <Input type="select" name="priority" id="idPriority"
                    onChange={this.selectPriorityOnChangeHandler} disabled={filterSearchById}>
                  <option selected value={0}> -- All -- </option>
                  {
                    priority.map((v, i) => {
                      return (
                        <option key={i} value={v}>{this._capitalize(v)}</option>
                      )
                    })
                  }
                  </Input>
                </FormGroup>
                </Col>
                <Col>
                <FormGroup>
                  <Label for="idType">Type</Label>
                  <Input type="select" name="type" id="idType"
                    onChange={this.selectTypeOnChangeHandler} disabled={filterSearchById}>
                  <option selected value={0}> -- All -- </option>
                  {
                    type.map((v, i) => {
                      return (
                        <option key={i} value={v}>{this._capitalize(v)}</option>
                      )
                    })
                  }
                  </Input>
                </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <InteractionsTable
          interactions={interactions} filters={filters}
        />
      </Container>
    );
  }
}

export default FilterForm;
