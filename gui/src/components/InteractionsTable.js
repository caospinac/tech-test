import React, { Component } from 'react';
import { Alert, Table, Row, Container } from 'reactstrap';

import PageControl from './PageControl'

class InteractionsTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: props.interactions,
      filters: props.filters,
      view: props.interactions,
      perPage: 10,
      currentPage: 1
    }
  }

  myFilter = (data, args) => {
    let new_d = [];
    // eslint-disable-next-line
    data.map((item) => {
      let c = 0;
      for (const key in args) {
        if (item[key] === args[key]) {
          ++c;
        }
      }
      if (c === Object.keys(args).length) {
        new_d.push(item);
      }
    });
    return new_d;
  }

  removeFalsy = (dict) => {
    let newDict = {};
    Object.keys(dict).forEach((prop) => {
      if (dict[prop]) { newDict[prop] = dict[prop]; }
    });
    return newDict;
  };

  componentWillReceiveProps = (props) => {

    const { interactions, filters } = props
    let view = []
    if (filters.searchById) {
      let found = interactions.find((item) => {
        return String(item._id) === filters.interactionId
      });
      if (found) view.push(found)
    } else {
      let newFilters = this.removeFalsy({
        userIntegrationId: filters.selectUsers,
        status: filters.status,
        priority: filters.priority,
        type: filters.type
      });
      if (filters.minDate) {
        let preView = []
        // eslint-disable-next-line
        this.myFilter(interactions, newFilters).map((x) =>{
          if (x.created_at >= filters.minDate) preView.push(x)
        })
        if (filters.maxDate) {
          // eslint-disable-next-line
          preView.map((x) => {
            if (x.created_at.slice(0, 10) <= filters.maxDate) view.push(x)
          })
        } else {
          // eslint-disable-next-line
          preView.map((x) => {
            if (x.created_at.slice(0, 10) === filters.minDate) view.push(x)
          })
        }
      } else if (filters.maxDate) {
        // eslint-disable-next-line
        this.myFilter(interactions, newFilters).map((x) =>{
          if (x.created_at.slice(0, 10) <= filters.maxDate) view.push(x)
        })
      } else view = this.myFilter(interactions, newFilters);
    }

    this.setState({
      data: interactions,
      filters: filters,
      view: view
    })
  }

  changePage = (page) => {
    this.setState({
      currentPage: page
    })
  }

  onPerPageChange = (e) => {
    this.setState({
      perPage: e.target.value
    })
  }

  render() {
    const { view, perPage, currentPage } = this.state;
    if (!view.length) {
      return (
        <Alert color="info">
          No results.
        </Alert>
      )
    }
    return (
      <Container>
        <PageControl changePage={this.changePage} rowCount={view.length}
          perPage={perPage} currentPage={currentPage} onPerPageChange={this.onPerPageChange} />
      <Row>
      <Table striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Interaction ID</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Type</th>
            <th>Name</th>
            <th>Integration ID</th>
          </tr>
        </thead>
        <tbody>
          {
            view.slice(perPage * (currentPage - 1), perPage * currentPage).map((x, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1 + perPage * (currentPage - 1)}</td>
                  <td>{x.created_at}</td>
                  <td>{x._id}</td>
                  <td>{x.status}</td>
                  <td>{x.priority}</td>
                  <td>{x.type}</td>
                  <td>{x.userFirstName.concat(" ", x.userLastName)}</td>
                  <td>{x.userIntegrationId}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      </Row>
      </Container>
    );
  }
}

export default InteractionsTable
